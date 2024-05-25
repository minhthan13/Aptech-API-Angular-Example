
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        var connectString = builder.Configuration["ConnectionStrings:DefaultConnection"];
        builder.Services.AddDbContext<ApiExampleContext>(option=>{
          option.UseLazyLoadingProxies().UseSqlServer(connectString);
        });
        // Add services to the container.
        builder.Services.AddAuthentication();
        builder.Services.AddAuthorization();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();
        app.UseStaticFiles();
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();


        app.Run();
    }
}
