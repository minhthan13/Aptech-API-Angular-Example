using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
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


    [HttpPost("Login")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
      try
      {
        if (await accountService.Login(loginRequest))
        {
          UserDto user = await accountService.GetAccountUsernameAsync(loginRequest.Username);
          var access_token = tokenService.GenAccessToken(user.id);
          var refresh_token = tokenService.GenRefreshToken();
          if (await tokenService.SaveTokenAsync(user.id, access_token, refresh_token))
          {
            var response = new
            {
              user.id,
              user.username,
              fullname = user.fullName,
              dob = user.DoB,
              user.photo,
              user.roles,
              access_token,
              refresh_token
            };
            return Ok(new ApiResponse(response, "Login Success"));
          }
          else
          {
            return BadRequest(new ErrorResponse(400));
          }
        }
        else
        {
          return BadRequest(new ErrorResponse(400));
        }
      }
      catch (BadRequestException ex)
      {
        return BadRequest(new ErrorResponse(400, ex.Message));
      }
    }
    [HttpPost("refresh-token")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
    {
      try
      {
        var access_token = await tokenService.RefreshTokenAsync(refreshToken);
        if (access_token is null)
        {
          return Unauthorized(new ErrorResponse(401));
        }
        else
        {
          return Ok(new ApiResponse(new { access_token }, "refresh token success"));
        }
      }
      catch (BadRequestException ex)
      {
        return Unauthorized(new ErrorResponse(401, ex.Message));
      }
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
    [Authorize]

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
