using FluentAssertions;
using GMQ_Quotes.Controllers;
using GMQ_Quotes.Data.Models;
using GMQ_Quotes.Services;
using GMQ_Quotes.UnitTest.MockData;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace GMQ_Quotes.UnitTest.Systems.Controllers
{
    public class TestQuotesController
    {
        [Fact]
        public async Task GetAllQuotes_ShouldReturn200Status()
        {
            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.GetAllQuotes())
                .ReturnsAsync(QuoteMockData.GetQuotesData());
            var sut = new QuotesController(quoteService.Object);

            var result = (OkObjectResult)await sut.GetAllQuotes();

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task GetAllQuotes_ShouldReturn400Status()
        {
            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.GetAllQuotes())
                .ReturnsAsync(QuoteMockData.GetNull());
            var sut = new QuotesController(quoteService.Object);

            var result = (BadRequestResult)await sut.GetAllQuotes();

            result.StatusCode.Should().Be(400);
        }

        [Fact]
        public async Task AddQuote_ShouldBeCalledExactlyOnce()
        {
            var quoteService = new Mock<IQuoteService>();
            var sut = new QuotesController(quoteService.Object);
            var quote = QuoteMockData.GetOneQuote();

            var result = await sut.AddQuote(quote);

            quoteService.Verify(_ => _.AddQuote(quote), Times.Exactly(1));
        }

        [Fact]
        public async Task AddQuote_ShouldReturn201Status()
        {
            var quote = QuoteMockData.GetOneQuote();
            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.AddQuote(quote))
                .ReturnsAsync(quote);
            var sut = new QuotesController(quoteService.Object);

            var result = (CreatedAtRouteResult)await sut.AddQuote(quote);

            result.StatusCode.Should().Be(201);
        }

        [Fact]
        public async Task EditQuote_ShouldReturn200Status()
        {
            var quote = QuoteMockData.GetOneQuote();
            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.EditQuote(quote))
                .ReturnsAsync(quote);
            var sut = new QuotesController(quoteService.Object);

            var result = (OkObjectResult)await sut.EditQuote(quote);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task EditQuote_ShouldReturn404Status()
        {
            var quote = QuoteMockData.GetOneQuote();
            Quote? res = null;

            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.EditQuote(quote))
                .ReturnsAsync(res);
            var sut = new QuotesController(quoteService.Object);

            var result = (NotFoundResult)await sut.EditQuote(quote);

            result.StatusCode.Should().Be(404);
        }
        
        [Fact]
        public async Task DeleteQuote_ShouldReturn200Status()
        {
            int id = 1;
            bool res = true;

            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.DeleteQuote(id))
                .ReturnsAsync(res);
            var sut = new QuotesController(quoteService.Object);

            var result = (OkResult)await sut.DeleteQuote(id);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task DeleteQuote_ShouldReturn400Status()
        {
            int id = 1;
            bool res = false;

            var quoteService = new Mock<IQuoteService>();
            quoteService.Setup(_ => _.DeleteQuote(id))
                .ReturnsAsync(res);
            var sut = new QuotesController(quoteService.Object);

            var result = (BadRequestResult)await sut.DeleteQuote(id);

            result.StatusCode.Should().Be(400);
        }
    }
}
