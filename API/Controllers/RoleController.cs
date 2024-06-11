using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Exceptions;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class RoleController : ControllerBase
  {
    private RoleService roleService;
    public RoleController(RoleService _roleService)
    {
      roleService = _roleService;
    }

    [HttpGet("getRoles")]
    [Produces("application/json")]
    public async Task<IActionResult> GetRoles()
    {
      try
      {
        var roles = await roleService.getRoles();
        if (roles is null)
        {
          return NotFound(new ErrorResponse(404, "role not found"));
        }
        return Ok(new ApiResponse(roles, "get roles success"));
      }
      catch
      {
        return BadRequest(new ErrorResponse(400));
      }
    }
  }
}