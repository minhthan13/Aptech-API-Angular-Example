using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace API.Entities
{
  [Table("Employee")]
  public class Employee
  {
    [Key]
    public int Id { get; set; }
    [StringLength(250)]
    public required string Username { get; set; }
    [StringLength(250)]
    public required string Password { get; set; }
    [StringLength(250)]
    public string? FullName { get; set; }
    [Column(TypeName = "datetime")]
    public DateTime Dob { get; set; }
    [StringLength(250)]
    public required string Photo { get; set; }

    [InverseProperty("EmployeeSubmiter")]
    public virtual ICollection<Request> RequestEmployeeSubmiters { get; set; } = [];

    [InverseProperty("EmployeeHandler")]
    public virtual ICollection<Request> RequestEmployeeHandlers { get; set; } = [];
    [ForeignKey("EmployeeId")]
    [InverseProperty("Employees")]
    public virtual ICollection<Role> Roles { get; set; } = [];
    [InverseProperty("Employee")]
    public virtual ICollection<Token> Tokens { get; set; } = [];
  }
}