using FluentAssertions;
using GMQ_Quotes.Controllers;
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
    }
}
