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
    }
}
