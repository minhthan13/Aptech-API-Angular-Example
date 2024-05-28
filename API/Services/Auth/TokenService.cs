using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Models;

namespace API.Services.Auth
{

  public interface TokenService
  {
    Task<TokenDto> GetTokenAsync(string refreshToken);
    Task<bool> SaveTokenAsync(int userId, string accessToken, string refreshToken);
    Task<bool> DeleteTokenAsync(Token token);
    string GenAccessToken(int userId);
    string GenRefreshToken();


  }
}