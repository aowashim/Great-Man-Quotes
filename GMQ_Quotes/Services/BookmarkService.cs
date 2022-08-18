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

        public BookmarkService(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<Quote>?> GetAllBookmarks()
        {
            try
            {
                string un = GetUsername()!;

                var user = await context.Users.Include(x => x.Bookmarks).Where(u => u.Username == un).ToListAsync();
                List<Bookmark> bookmarks = user[0].Bookmarks;

                List<Quote> quotes = await context.Quotes.ToListAsync();
                List<Quote> res = quotes.Join(bookmarks, q => q.Id, b => b.QuoteId, (q, b) => q)
                    .Select(q => new Quote { Id = q.Id, Title = q.Title, Author = q.Author }).ToList();

                return res;
            }
            catch (Exception)
            {
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
            catch (Exception)
            {
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
