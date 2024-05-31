﻿// <auto-generated />
using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(ApiExampleContext))]
    [Migration("20240530151412_update")]
    partial class update
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Dob")
                        .HasColumnType("datetime");

                    b.Property<string>("FullName")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Photo")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)")
                        .HasDefaultValue("Default.jpg");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id")
                        .HasName("PK_Employee");

                    b.HasIndex("Username")
                        .HasDatabaseName("IX_Employee_Username");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("API.Entities.Priority", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Priority");
                });

            modelBuilder.Entity("API.Entities.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("EmployeeIdHandling")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeIdSubmit")
                        .HasColumnType("int");

                    b.Property<int>("PriorityId")
                        .HasColumnType("int");

                    b.Property<DateTime>("SentDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("datetime");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id")
                        .HasName("PK_Request");

                    b.HasIndex("EmployeeIdHandling");

                    b.HasIndex("EmployeeIdSubmit");

                    b.HasIndex("PriorityId");

                    b.ToTable("Request");
                });

            modelBuilder.Entity("API.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id")
                        .HasName("PK_Role");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("API.Entities.Token", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AccessToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiryDate")
                        .HasColumnType("datetime");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id")
                        .HasName("PK_Token");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Token");
                });

            modelBuilder.Entity("EmployeeRole", b =>
                {
                    b.Property<int>("EmployeeId")
                        .HasColumnType("int")
                        .HasColumnName("employeeId");

                    b.Property<int>("RoleId")
                        .HasColumnType("int")
                        .HasColumnName("roleId");

                    b.HasKey("EmployeeId", "RoleId")
                        .HasName("PK_EmployeeRole_Key");

                    b.HasIndex("RoleId");

                    b.HasIndex(new[] { "EmployeeId", "RoleId" }, "IX_EmployeeRole");

                    b.ToTable("EmployeeRole", (string)null);
                });

            modelBuilder.Entity("API.Entities.Request", b =>
                {
                    b.HasOne("API.Entities.Employee", "EmployeeHandler")
                        .WithMany("RequestEmployeeHandlers")
                        .HasForeignKey("EmployeeIdHandling")
                        .HasConstraintName("FK_Request_Employee_Handler");

                    b.HasOne("API.Entities.Employee", "EmployeeSubmiter")
                        .WithMany("RequestEmployeeSubmiters")
                        .HasForeignKey("EmployeeIdSubmit")
                        .IsRequired()
                        .HasConstraintName("FK_Request_Employee_Submiter");

                    b.HasOne("API.Entities.Priority", "Priorities")
                        .WithMany("Requests")
                        .HasForeignKey("PriorityId")
                        .IsRequired()
                        .HasConstraintName("FK_Request_Priority");

                    b.Navigation("EmployeeHandler");

                    b.Navigation("EmployeeSubmiter");

                    b.Navigation("Priorities");
                });

            modelBuilder.Entity("API.Entities.Token", b =>
                {
                    b.HasOne("API.Entities.Employee", "Employee")
                        .WithMany("Tokens")
                        .HasForeignKey("EmployeeId")
                        .IsRequired()
                        .HasConstraintName("FK_Token_Employee");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("EmployeeRole", b =>
                {
                    b.HasOne("API.Entities.Employee", null)
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .IsRequired()
                        .HasConstraintName("FK_EmployeeRole_Employees");

                    b.HasOne("API.Entities.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .IsRequired()
                        .HasConstraintName("FK_EmployeeRole_Roles");
                });

            modelBuilder.Entity("API.Entities.Employee", b =>
                {
                    b.Navigation("RequestEmployeeHandlers");

                    b.Navigation("RequestEmployeeSubmiters");

                    b.Navigation("Tokens");
                });

            modelBuilder.Entity("API.Entities.Priority", b =>
                {
                    b.Navigation("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}