using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Exceptions;
using API.Models;
using API.Services;
using API.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly AccountService accountService;
    private readonly TokenService tokenService;
    private IWebHostEnvironment webHost;

    public AccountController(AccountService _accountService, TokenService _tokenService, IWebHostEnvironment _webHost)
    {
      accountService = _accountService;
      tokenService = _tokenService;
      webHost = _webHost;
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
              user.dob,
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
    public async Task<IActionResult> RefreshToken([FromForm] string refreshToken)
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

    [Authorize]
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
    [HttpPost("add-new-account")]
    [Produces("application/json")]
    public async Task<IActionResult> AddNewAccount([FromForm] string user, [FromForm] IFormFile? file)
    {
      try
      {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter()
        {
          DateTimeFormat = "dd/MM/yyyy"
        });
        UserDto userDto = JsonConvert.DeserializeObject<UserDto>(user, setting);
        if (accountService.Exist(userDto.username))
        {
          return BadRequest(new ErrorResponse(400, "user name alredy exists !!"));
        }
        List<string> ListRoleName = userDto.roles.Select(r => r.name).ToList() ?? [];
        var account = new Employee()
        {
          Username = userDto.username,
          Password = userDto.password,
          FullName = userDto.fullName,
          Dob = DateTime.Parse(userDto.dob),

          Photo = file != null ? $"{DateTime.Now.ToString("ddMMyyyy")}_{userDto.photo}" : null
        };



        if (await accountService.addNewAccount(account, ListRoleName))
        {
          if (file != null)
          {
            var path = Path.Combine(webHost.WebRootPath, "images/account", account.Photo);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
              file.CopyTo(fileStream);
            }
          }
          return Ok(new { message = "Add account success" });
        }
        else
        {
          return BadRequest(new ErrorResponse(400, "add account failed"));
        }
      }
      catch
      {
        return BadRequest(new ErrorResponse(400, "add account failed"));
      }
    }

  }



}

//========
