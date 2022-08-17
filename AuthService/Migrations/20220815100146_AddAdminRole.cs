using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Migrations
{
    public partial class AddAdminRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'd80757fa-9553-4829-bc0a-4a75a9068c89', N'Admin', N'ADMIN', N'40dbbf14-f55f-42cc-ba5d-89689734f337')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
