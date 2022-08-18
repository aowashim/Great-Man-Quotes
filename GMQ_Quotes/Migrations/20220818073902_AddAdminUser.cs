using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GMQ_Quotes.Migrations
{
    public partial class AddAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[Users] ([Username], [Name], [City]) VALUES (N'aowashim@gmail.com', N'Owashim Akram', N'Nagaon')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
