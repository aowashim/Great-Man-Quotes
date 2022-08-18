using GMQ_Quotes.Data.Models;
using GMQ_Quotes.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GMQ_Quotes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly IBookmarkService bookmarkService;

        public BookmarkController(IBookmarkService bookmarkService)
        {
            this.bookmarkService = bookmarkService;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<List<Quote>>> GetAllBookmarks()
        {
            var res = await bookmarkService.GetAllBookmarks();

            return res == null ? BadRequest() : Ok(res);
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateBookmark(int id)
        {
            var res = await bookmarkService.CreateBookmark(id);

            return res ? Ok() : BadRequest();
        }
    }
}


