using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Exceptions;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services.Auth
{
  public class TokenServiceImpl : TokenService
  {
    private readonly ApiExampleContext db;
    private readonly IConfiguration configuration;

    public TokenServiceImpl(ApiExampleContext _db, IConfiguration _configuration)
    {
      db = _db;
      configuration = _configuration;
    }



    public async Task<TokenDto> GetTokenAsync(string refreshToken)
    {
      var token = await db.Tokens.SingleOrDefaultAsync(t => t.RefreshToken == refreshToken);
      if (token is null) return null;
      return new TokenDto
      {
        AccessToken = token.AccessToken,
        RefreshToken = token.RefreshToken,
        ExpiryDate = token.ExpiryDate.ToString("dd/MM/yyyy")
      };
    }
    public async Task<string?> RefreshTokenAsync(string refreshToken)
    {
      var token = await db.Tokens.SingleOrDefaultAsync(t => t.RefreshToken == refreshToken);
      if (token is null) return null;

      if (token.ExpiryDate < DateTime.UtcNow)
      {
        throw new BadRequestException(401, "refreshtoken has expired");
      }

      var newAccessToken = GenAccessToken(token.EmployeeId);
      token.AccessToken = newAccessToken;
      db.Entry(token).State = EntityState.Modified;
      await db.SaveChangesAsync();

      return newAccessToken;
    }

    public async Task<bool> SaveTokenAsync(int userId, string accessToken, string refreshToken)
    {

      var token = new Token
      {
        EmployeeId = userId,
        AccessToken = accessToken,
        RefreshToken = refreshToken,
        ExpiryDate = DateTime.UtcNow.AddMinutes(Convert.ToDouble(configuration["Jwt:RefreshTokenExpirationMinutes"]))
      };
      try
      {
        var FindToken = await db.Tokens.SingleOrDefaultAsync(t => t.EmployeeId == userId);
        if (FindToken == null)
        {
          await db.Tokens.AddAsync(token);
        }
        else
        {
          FindToken.AccessToken = token.AccessToken;
          FindToken.RefreshToken = token.RefreshToken;
          FindToken.ExpiryDate = token.ExpiryDate;
          db.Entry(FindToken).State = EntityState.Modified;
        }
        return await db.SaveChangesAsync() > 0;

      }
      catch
      {
        return false;
      }

    }
    public async Task<bool> DeleteTokenAsync(Token token)
    {
      try
      {
        db.Tokens.Remove(token);
        return await db.SaveChangesAsync() > 0;
      }
      catch
      {
        return false;
      }
    }








    public string GenAccessToken(int userId)
    {
      var tokenHandle = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
      var tokenDescription = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity([
          new Claim(ClaimTypes.NameIdentifier,userId.ToString())
        ]),
        Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(configuration["Jwt:AccessTokenExpirationMinutes"])),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        Issuer = configuration["Jwt:Issuer"],
        Audience = configuration["Jwt:Audience"],
      };
      var token = tokenHandle.CreateToken(tokenDescription);
      return tokenHandle.WriteToken(token);
    }

    public string GenRefreshToken()
    {
      var randomNumber = new byte[32];
      using (var rng = RandomNumberGenerator.Create())
      {
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
      }
    }
  }
}