using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Configs
{
  public static class AppService
  {

    // Database Context
    public static void AddMyDBContext(this IServiceCollection services, IConfiguration configuration)
    {
      var connectString = configuration["ConnectionStrings:DefaultConnection"];
      services.AddDbContext<ApiExampleContext>(option =>
      {
        option.UseLazyLoadingProxies().UseSqlServer(connectString);
      });
    }
    // My App Services
    public static void AddMyService(this IServiceCollection services)
    {
      services.AddScoped<AccountService, AccountServiceImpl>();
    }
  }
}