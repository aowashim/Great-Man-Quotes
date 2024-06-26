﻿using GMQ_Quotes.Data.DTO;
using GMQ_Quotes.Data.Models;

namespace GMQ_Quotes.Services
{
    public interface IQuoteService
    {
        Task<List<Quote>?> GetAllQuotes();
        Task<Quote?> GetQuoteById(int id);
        Task<Quote?> AddQuote(Quote quote);
        Task<Quote?> EditQuote(Quote quote);
        Task<bool> DeleteQuote(int id);
        void RaiseIssue(Issue issue);
    }
}
