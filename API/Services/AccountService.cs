using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Models;

namespace API.Services
{
  public interface AccountService
  {
    Task<List<UserDto>> GetAccountsAsync();
    Task<UserDto> GetAccountIdAsync(int id);
    Task<UserDto> GetAccountUsernameAsync(string username);

    Task<bool> Login(LoginRequest loginRequest);
    Task<bool> addNewAccount(Employee employee, List<string> roleName);
    public bool Exist(string username);

  }
}