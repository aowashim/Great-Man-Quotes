﻿using GMQ_Quotes.Data;
using GMQ_Quotes.Data.DTO;
using GMQ_Quotes.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GMQ_Quotes.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly AppDbContext context;
        private readonly IRabbitMQService rabbitMQService;
        private readonly ILogger<QuoteService> logger;

        public QuoteService(AppDbContext context, IRabbitMQService rabbitMQService, ILogger<QuoteService> logger)
        {
            this.context = context;
            this.rabbitMQService = rabbitMQService;
            this.logger = logger;
        }

        public async Task<Quote?> AddQuote(Quote quote)
        {
            try
            {
                var res = await context.Quotes.AddAsync(quote);
                await context.SaveChangesAsync();

                return res.Entity;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
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
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
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
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
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
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<bool> DeleteQuote(int id)
        {
            try
            {
                logger.LogError("****************");
                Quote? quoteFromDB = await context.Quotes.FindAsync(id);

                if (quoteFromDB == null) return false;

                context.Quotes.Remove(quoteFromDB);
                await context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return false;
            }
        }

        public void RaiseIssue(Issue issue)
        {
            rabbitMQService.PublishIssue(issue);
        }
    }
}
