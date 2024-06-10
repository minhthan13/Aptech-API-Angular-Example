using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
  public class ApiResponse
  {
    public object? data { get; set; }
    public int code { get; set; }
    public string message { get; set; }
    public ApiResponse(object _data, string _message)
    {
      data = _data ?? null;
      code = 200;
      message = _message;
    }
  }
}