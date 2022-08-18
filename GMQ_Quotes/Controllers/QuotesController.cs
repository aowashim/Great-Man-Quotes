﻿using GMQ_Quotes.Data.Models;
using GMQ_Quotes.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GMQ_Quotes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteService quoteService;

        public QuotesController(IQuoteService quoteService)
        {
            this.quoteService = quoteService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Quote>>> GetAllQuotes()
        {
            var res = await quoteService.GetAllQuotes();

            return res == null ? BadRequest() : Ok(res);
        }

        [HttpGet("{id}", Name = "GetQuoteById")]
        public async Task<ActionResult<Quote>> GetQuoteById(int id)
        {
            var res = await quoteService.GetQuoteById(id);

            return res == null ? NotFound() : Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<Quote>> AddQuote(Quote quote)
        {
            var res = await quoteService.AddQuote(quote);

            return res == null ? BadRequest() :
                CreatedAtRoute(nameof(GetQuoteById), new { res.Id }, res);
        }
    }
}