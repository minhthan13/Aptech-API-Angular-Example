using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Models
{
  public class RoleDto
  {
    public int id { get; set; }
    public string name { get; set; }

    public RoleDto(Role role)
    {
      id = role.Id;
      name = role.RoleName;
    }
    public RoleDto() { }
  }
}