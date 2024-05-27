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
  public class AccountController : ControllerBase
  {
    private readonly AccountService accountService;

    public AccountController(AccountService _accountService)
    {
      accountService = _accountService;
    }

    [HttpGet("getAccounts")]
    [Produces("application/json")]
    public async Task<IActionResult> getAccount()
    {
      try
      {
        var account = await accountService.GetAccountsAsync();
        if (account is null) return NotFound(new ErrorResponse(404));
        return Ok(account);
      }
      catch
      {
        return BadRequest(new ErrorResponse(400));
      }

    }

  }




}

//========
