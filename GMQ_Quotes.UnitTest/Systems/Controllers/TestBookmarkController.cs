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
    public class TestBookmarkController
    {
        [Fact]
        public async Task GetAllBookmarks_ShouldReturn200Status()
        {
            var bookmarkService = new Mock<IBookmarkService>();
            bookmarkService.Setup(_ => _.GetAllBookmarks())
                .ReturnsAsync(QuoteMockData.GetQuotesData());
            var sut = new BookmarkController(bookmarkService.Object);

            var result = (OkObjectResult)await sut.GetAllBookmarks();

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task GetAllBookmarks_ShouldReturn400Status()
        {
            var bookmarkService = new Mock<IBookmarkService>();
            bookmarkService.Setup(_ => _.GetAllBookmarks())
                .ReturnsAsync(QuoteMockData.GetNull());
            var sut = new BookmarkController(bookmarkService.Object);

            var result = (BadRequestResult)await sut.GetAllBookmarks();

            result.StatusCode.Should().Be(400);
        }

        [Fact]
        public async Task CreateBookmark_ShouldReturn200Status()
        {
            int id = 2;
            bool res = true;

            var bookmarkService = new Mock<IBookmarkService>();
            bookmarkService.Setup(_ => _.CreateBookmark(id))
                .ReturnsAsync(res);
            var sut = new BookmarkController(bookmarkService.Object);

            var result = (OkResult)await sut.CreateBookmark(id);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task CreateBookmark_ShouldReturn400Status()
        {
            int id = 2;
            bool res = false;

            var bookmarkService = new Mock<IBookmarkService>();
            bookmarkService.Setup(_ => _.CreateBookmark(id))
                .ReturnsAsync(res);
            var sut = new BookmarkController(bookmarkService.Object);

            var result = (BadRequestResult)await sut.CreateBookmark(id);

            result.StatusCode.Should().Be(400);
        }

        [Fact]
        public async Task DeleteBookmark_ShouldReturn200Status()
        {
            int id = 2;
            bool res = true;

            var bookmarkService = new Mock<IBookmarkService>();
            bookmarkService.Setup(_ => _.DeleteBookmark(id))
                .ReturnsAsync(res);
            var sut = new BookmarkController(bookmarkService.Object);

            var result = (OkResult)await sut.DeleteBookmark(id);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task DeleteBookmark_ShouldReturn400Status()
        {
            int id = 2;
            bool res = false;

            var bookmarkService = new Mock<IBookmarkService>();
            bookmarkService.Setup(_ => _.DeleteBookmark(id))
                .ReturnsAsync(res);
            var sut = new BookmarkController(bookmarkService.Object);

            var result = (BadRequestResult)await sut.DeleteBookmark(id);

            result.StatusCode.Should().Be(400);
        }
    }
}
