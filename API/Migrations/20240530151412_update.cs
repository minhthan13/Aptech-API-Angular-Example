using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TOKEN_USER",
                table: "Token");

            migrationBuilder.CreateIndex(
                name: "IX_Token_EmployeeId",
                table: "Token",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Token_EmployeeId",
                table: "Token");

            migrationBuilder.CreateIndex(
                name: "IX_TOKEN_USER",
                table: "Token",
                column: "EmployeeId",
                unique: true);
        }
    }
}
