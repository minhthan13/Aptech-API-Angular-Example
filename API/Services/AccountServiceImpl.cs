using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Exceptions;
using API.Models;
using API.Services.Auth;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  public class AccountServiceImpl : AccountService
  {
    private readonly ApiExampleContext db;
    private readonly TokenService tokenService;
    public AccountServiceImpl(ApiExampleContext _db, TokenService _tokenService)
    {
      db = _db;
      tokenService = _tokenService;
    }

    public async Task<UserDto> GetAccountIdAsync(int id)
    {
      var user = await db.Employees.FindAsync(id);
      return new UserDto(user);
    }
    public async Task<UserDto> GetAccountUsernameAsync(string username)
    {
      var user = await db.Employees.SingleOrDefaultAsync(e => e.Username == username);
      return new UserDto(user);
    }
    public async Task<List<UserDto>> GetAccountsAsync()
    {
      return await db.Employees.Include(e => e.Roles).Select(e => new UserDto(e)).ToListAsync();
    }

    public async Task<bool> Login(LoginRequest loginRequest)
    {
      try
      {
        var account = await db.Employees.SingleOrDefaultAsync(e => e.Username == loginRequest.Username);
        if (account == null)
        {
          throw new NotFoundException(nameof(Employee), loginRequest.Username);
        }
        if (account.Password != loginRequest.Password)
        {
          throw new BadRequestException(400, "invalid account ");
        }
        return true;
      }
      catch
      {
        return false;
      }

    }
  }
}