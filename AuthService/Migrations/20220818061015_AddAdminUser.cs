using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Migrations
{
    public partial class AddAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'f7d7ed3a-6c85-43bf-82ed-2fd4d58200ed', N'aowashim@gmail.com', N'AOWASHIM@GMAIL.COM', N'aowashim@gmail.com', N'AOWASHIM@GMAIL.COM', 0, N'AQAAAAEAACcQAAAAEDdLPPnm0/Hoz6Qv3p6q+aiW8nkOVquObEK+eayzs6ggeu7UOvIN+ddTLv+M9fyHFg==', N'GGNBJ7VTMGC5NO7R7LFOLR56VI3MK4YA', N'f9d21cd0-de8f-4760-99a8-5976e8c3aa4e', NULL, 0, 0, NULL, 1, 0)");
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f7d7ed3a-6c85-43bf-82ed-2fd4d58200ed', N'd80757fa-9553-4829-bc0a-4a75a9068c89')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
