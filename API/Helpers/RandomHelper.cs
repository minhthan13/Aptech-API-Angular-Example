using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI_EFCore.Helpers
{
  public class RandomHelper
  {
    public static string generateSecurityCode()
    {
      return Guid.NewGuid().ToString().Replace("-", "");
    }
  }
}