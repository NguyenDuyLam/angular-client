using Microsoft.EntityFrameworkCore.Migrations;

namespace KLTN.Models.Migrations
{
    public partial class UpdateDatabase_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Vcoin",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vcoin",
                table: "Users");
        }
    }
}
