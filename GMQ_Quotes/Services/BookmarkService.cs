using GMQ_Quotes.Data;
using GMQ_Quotes.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GMQ_Quotes.Services
{
    public class BookmarkService : IBookmarkService
    {
        private readonly AppDbContext context;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ILogger logger;

        public BookmarkService(AppDbContext context, IHttpContextAccessor httpContextAccessor, ILogger<BookmarkService> logger)
        {
            this.context = context;
            this.httpContextAccessor = httpContextAccessor;
            this.logger = logger;
        }

        public async Task<List<Quote>?> GetAllBookmarks()
        {
            try
            {
                string un = GetUsername()!;

                User user = context.Users.Include(x => x.Bookmarks).Single(u => u.Username == un);
                List<Bookmark> bookmarks = user.Bookmarks;

                List<Quote> quotes = await context.Quotes.ToListAsync();
                List<Quote> res = quotes.Join(bookmarks, q => q.Id, b => b.QuoteId, (q, b) => q)
                    .Select(q => new Quote { Id = q.Id, Title = q.Title, Author = q.Author }).ToList();

                return res;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<bool> CreateBookmark(int id)
        {
            try
            {
                string un = GetUsername()!;

                User? user = await context.Users.FindAsync(un);
                Quote? quote = await context.Quotes.FindAsync(id);

                Bookmark bookmark = new() { QuoteId = id, UserUsername = un };

                user?.Bookmarks.Add(bookmark);
                quote?.Bookmarks.Add(bookmark);

                await context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<bool> DeleteBookmark(int id)
        {
            try
            {
                string un = GetUsername()!;

                User user = context.Users.Include(u => u.Bookmarks).Single(u => u.Username == un);
                Quote quote = context.Quotes.Include(q => q.Bookmarks).Single(q => q.Id == id);

                Bookmark bookmark = user.Bookmarks.Single(b => b.UserUsername == un && b.QuoteId == id);

                user.Bookmarks.Remove(bookmark);
                quote.Bookmarks.Remove(bookmark);

                await context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return false;
            }
        }

        private string? GetUsername()
        {
            string? res = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name);
            return res;
        }
    }
}
