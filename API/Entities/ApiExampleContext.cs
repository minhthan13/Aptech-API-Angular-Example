using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
  public class ApiExampleContext : DbContext
  {
    public ApiExampleContext(DbContextOptions<ApiExampleContext> options)
          : base(options)
    {
    }

    public ApiExampleContext()
    {
    }
    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Request> Requests { get; set; }
    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<Priority> Priorities { get; set; }
    public virtual DbSet<Token> Tokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Employee>(entity =>
      {
        entity.HasKey(e => e.Id).HasName("PK_Employee");
        entity.HasIndex(e => e.Username).HasDatabaseName("IX_Employee_Username");
        entity.Property(e => e.Photo).HasDefaultValue("Default.jpg");
      });

      modelBuilder.Entity<Request>(entity =>
      {
        entity.HasKey(r => r.Id).HasName("PK_Request");
        entity.HasOne(request => request.EmployeeHandler)
              .WithMany(Employee => Employee.RequestEmployeeHandlers)
              .HasConstraintName("FK_Request_Employee_Handler");
        entity.HasOne(request => request.EmployeeSubmiter)
              .WithMany(Employee => Employee.RequestEmployeeSubmiters)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("FK_Request_Employee_Submiter");
        entity.HasOne(request => request.Priorities)
              .WithMany(priority => priority.Requests)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("FK_Request_Priority");
      });

      modelBuilder.Entity<Role>(entity =>
      {
        entity.HasKey(e => e.Id).HasName("PK_Role");
        entity.HasMany(role => role.Employees).WithMany(employee => employee.Roles)
        .UsingEntity<Dictionary<string, object>>(
          "EmployeeRole",
          e => e.HasOne<Employee>()
                .WithMany()
                .HasForeignKey("EmployeeId")
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeRole_Employees"),
          r => r.HasOne<Role>()
                .WithMany()
                .HasForeignKey("RoleId")
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeRole_Roles"),
          er =>
          {
            er.HasKey("EmployeeId", "RoleId").HasName("PK_EmployeeRole_Key");
            er.ToTable("EmployeeRole");
            er.HasIndex(["EmployeeId", "RoleId"], "IX_EmployeeRole");
            er.IndexerProperty<int>("RoleId").HasColumnName("roleId");
            er.IndexerProperty<int>("EmployeeId").HasColumnName("employeeId");
          }
        );
      });

      modelBuilder.Entity<Token>(token =>
      {
        token.HasKey(t => t.Id).HasName("PK_Token");
        token.HasOne(t => t.Employee).WithMany(e => e.Tokens).HasForeignKey(t => t.EmployeeId).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Token_Employee");
      });

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      base.OnConfiguring(optionsBuilder);
    }
  }
}