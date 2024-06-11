using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Services
{
  public interface RoleService
  {
    Task<List<RoleDto>> getRoles();
    Task<RoleDto> getRoleById(int id);
    Task<RoleDto> getRoleByName(string name);
  }
}