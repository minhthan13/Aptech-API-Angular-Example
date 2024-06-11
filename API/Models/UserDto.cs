using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Models
{
  public class UserDto
  {
    public int id { get; set; }
    public string username { get; set; }
    public string? password { get; set; }
    public string? fullName { get; set; }
    public string? Dob { get; set; }
    public string? photo { get; set; }
    public List<roleRequest?>? roles { get; set; }
    public class roleRequest
    {
      public int? id { get; set; }
      public string name { get; set; }
    }
    public UserDto() { }
    public UserDto(Employee employee)
    {
      id = employee.Id;
      username = employee.Username;
      fullName = employee.FullName ?? "";
      Dob = employee.Dob.ToString("dd/MM/yyyy");
      photo = employee.Photo;
      roles = employee.Roles.Select(r => new roleRequest { id = r.Id, name = r.RoleName }).ToList() ?? [];
      password = "";

    }



  }
}