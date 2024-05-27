using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;

namespace API.Configs
{
  public static class SwaggerConfig
  {
    public static void AddSwaggerConfig(this IServiceCollection services)
    {
      services.AddSwaggerGen(option =>
      {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "AngularExample", Version = "v1" });
      });
    }

    public static void UseSwaggerConfig(this IApplicationBuilder app)
    {
      app.UseSwagger();
      app.UseSwaggerUI(options =>
      {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
      });
    }
  }
}