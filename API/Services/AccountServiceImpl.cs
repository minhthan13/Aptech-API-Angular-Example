using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  public class AccountServiceImpl : AccountService
  {
    private readonly ApiExampleContext db;
    public AccountServiceImpl(ApiExampleContext _db)
    {
      db = _db;
    }
    public async Task<List<ResUser>> GetAccountsAsync()
    {
      return await db.Employees.Include(e => e.Roles).Select(e => new ResUser(e)).ToListAsync();
    }
  }
}