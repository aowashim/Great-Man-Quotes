using GMQ_Quotes.Data.Models;

namespace GMQ_Quotes.Services
{
    public interface IBookmarkService
    {
        Task<List<Quote>?> GetAllBookmarks();
        Task<bool> CreateBookmark(int id);
        Task<bool> DeleteBookmark(int id);
    }
}
