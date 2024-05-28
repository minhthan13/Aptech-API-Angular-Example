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
        var accounts = await accountService.GetAccountsAsync();
        if (accounts is null) return NotFound(new ErrorResponse(404));
        return Ok(new ApiResponse(accounts, "get all account success"));
      }
      catch
      {
        return BadRequest(new ErrorResponse(400));
      }
    }

    [HttpGet("getAccountId/{id}")]
    [Produces("application/json")]
    public async Task<IActionResult> getAccountId(int id)
    {
      try
      {
        var account = await accountService.GetAccountIdAsync(id);
        if (account is null) return NotFound(new ErrorResponse(404));
        return Ok(new ApiResponse(account, $"get account ID: {id} success"));
      }
      catch
      {
        return BadRequest(new ErrorResponse(400));
      }
    }

  }



}

//========
