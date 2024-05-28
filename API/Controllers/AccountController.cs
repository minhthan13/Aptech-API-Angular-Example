using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Exceptions;
using API.Models;
using API.Services;
using API.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly AccountService accountService;
    private readonly TokenService tokenService;

    public AccountController(AccountService _accountService, TokenService _tokenService)
    {
      accountService = _accountService;
      tokenService = _tokenService;
    }
    [HttpGet("getAccounts")]
    [Produces("application/json")]
    [Authorize]
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



    [HttpGet("getToken/{refreshToken}")]
    [Produces("application/json")]
    public async Task<IActionResult> getToken(string refreshToken)
    {
      try
      {

        return Ok(await tokenService.GetTokenAsync(refreshToken));
      }
      catch
      {
        return BadRequest();
      }
    }


    [HttpPost("Login")]
    [Produces("application/json")]
    public async Task<IActionResult> Login()
    {
      try
      {
        var AT = tokenService.GenAccessToken(2);
        var RT = tokenService.GenRefreshToken();
        var data = new
        {
          access_token = AT,
          refresh_token = RT
        };
        if (await tokenService.SaveTokenAsync(2, AT, RT))
        {

          return Ok(new ApiResponse(data, "Login Success"));
        }
        else
        {
          return BadRequest(new ErrorResponse(404));
        }
      }
      catch
      {
        return BadRequest();
      }
    }


  }



}

//========
