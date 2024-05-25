using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
  [Table("Role")]
    public class Role
    { 
        [Key]
        public int Id { get; set; }
        [StringLength(250)]
       
        public required string RoleName { get; set; }


        [ForeignKey("RoleId")]
        [InverseProperty("Roles")]
        public virtual ICollection<Employee> Employees { get;set; } = [];
    }
}