using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
  [Table("Priority")]
    public class Priority
    {
        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public required string Name { get; set; }

        [InverseProperty("Priorities")]
        public virtual ICollection<Request> Requests { get;set;} = [];

    }
}