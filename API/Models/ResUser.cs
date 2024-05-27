using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Models
{
  public class ResUser
  {
    public int id { get; set; }
    public string name { get; set; }
    public string? fullName { get; set; }
    public string DoB { get; set; }
    public string photo { get; set; }
    public object roles { get; set; }

    public ResUser(Employee employee)
    {
      id = employee.Id;
      name = employee.Username;
      fullName = employee.FullName ?? "";
      DoB = employee.Dob.ToString("dd/MM/yyyy");
      photo = employee.Photo;
      roles = employee.Roles.Select(r => r.RoleName);

    }


  }
}