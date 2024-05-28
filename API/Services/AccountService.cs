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
    Task<List<ResUser>> GetAccountsAsync();
    Task<ResUser> GetAccountIdAsync(int id);
  }
}