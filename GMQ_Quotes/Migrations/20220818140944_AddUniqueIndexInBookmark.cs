using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GMQ_Quotes.Migrations
{
    public partial class AddUniqueIndexInBookmark : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookmark_UserUsername",
                table: "Bookmark");

            migrationBuilder.CreateIndex(
                name: "IX_Bookmark_UserUsername_QuoteId",
                table: "Bookmark",
                columns: new[] { "UserUsername", "QuoteId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookmark_UserUsername_QuoteId",
                table: "Bookmark");

            migrationBuilder.CreateIndex(
                name: "IX_Bookmark_UserUsername",
                table: "Bookmark",
                column: "UserUsername");
        }
    }
}
