using GMQ_Quotes.Data;
using GMQ_Quotes.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GMQ_Quotes.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly AppDbContext context;

        public QuoteService(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<Quote?> AddQuote(Quote quote)
        {
            try
            {
                var res = await context.Quotes.AddAsync(quote);
                await context.SaveChangesAsync();

                return res.Entity;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<Quote>?> GetAllQuotes()
        {
            try
            {
                var res = await context.Quotes.ToListAsync();
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Quote?> GetQuoteById(int id)
        {
            try
            {
                var res = await context.Quotes.FindAsync(id);
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Quote?> EditQuote(Quote quote)
        {
            try
            {
                Quote? quoteFromDB = await context.Quotes.FindAsync(quote.Id);
                
                if (quoteFromDB == null) return null;
                
                quoteFromDB.Title = quote.Title;
                quoteFromDB.Author = quote.Author;

                await context.SaveChangesAsync();

                return quoteFromDB;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> DeleteQuote(int id)
        {
            try
            {
                Quote? quoteFromDB = await context.Quotes.FindAsync(id);

                if (quoteFromDB == null) return false;

                context.Quotes.Remove(quoteFromDB);
                await context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
