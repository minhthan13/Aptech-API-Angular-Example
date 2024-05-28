using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
  [Table("Token")]
  public class Token
  {
    [Key]
    public int Id { get; set; }

    public required int EmployeeId { get; set; }

    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime ExpiryDate { get; set; }

    [ForeignKey("EmployeeId")]
    [InverseProperty("Tokens")]
    public virtual Employee Employee { get; set; }
  }
}