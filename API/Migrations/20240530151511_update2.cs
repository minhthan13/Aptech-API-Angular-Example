using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
  /// <inheritdoc />
  public partial class update2 : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropIndex(
                    name: "IX_Token_EmployeeId",
                    table: "Token");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropIndex(
                  name: "IX_Token_EmployeeId",
                  table: "Token");
    }
  }
}
