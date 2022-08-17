using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Migrations
{
    public partial class AddUserRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'079455d9-324a-4dd5-ab45-e969c9d399e5', N'User', N'USER', N'a11096b6-25c6-4d94-9f13-6edc9235dbfb')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
