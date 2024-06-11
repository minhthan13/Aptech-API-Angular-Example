using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Exceptions;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  public class RoleServiceImpl : RoleService
  {
    private ApiExampleContext db;
    public RoleServiceImpl(ApiExampleContext _db)
    {
      db = _db;
    }
    public async Task<RoleDto> getRoleById(int id)
    {
      var role = await db.Roles.FindAsync(id);
      if (role == null) throw new NotFoundException(nameof(Role), id);
      return new RoleDto(role);

    }

    public async Task<RoleDto> getRoleByName(string name)
    {
      var role = await db.Roles.SingleOrDefaultAsync(r => r.RoleName == name);
      if (role == null) throw new NotFoundException(nameof(Role), name);
      return new RoleDto(role);

    }

    public async Task<List<RoleDto>> getRoles()
    {

      return await db.Roles
      .AsNoTracking()
      .Include(r => r.Employees)
      .Select(r => new RoleDto(r))
      .ToListAsync();
    }
  }
}