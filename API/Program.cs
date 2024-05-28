
using API.Configs;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API;

public class Program
{
  public static void Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddControllers();

    //add service from configs folder
    builder.Services.AddMyDBContext(builder.Configuration);
    builder.Services.AddMyService();
    //=========

    builder.Services.AddJWTTokenConfig(builder.Configuration);
    builder.Services.AddAuthorization();

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerConfig();


    var app = builder.Build();
    app.UseStaticFiles();
    if (app.Environment.IsDevelopment())
    {
      app.UseSwaggerConfig();
    }
    app.UseCors(c => c
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .SetIsOriginAllowed((host) => true)
        .WithOrigins("https://localhost:4200/", "https://localhost:4200/"));

    app.UseMiddleware<HttpExceptionMiddleware>();
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();


    app.Run();
  }
}
