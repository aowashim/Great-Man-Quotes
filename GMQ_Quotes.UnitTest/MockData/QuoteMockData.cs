using GMQ_Quotes.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GMQ_Quotes.UnitTest.MockData
{
    internal class QuoteMockData
    {
        public static List<Quote> GetQuotesData()
        {
            return new List<Quote>
            {
                new Quote
                {
                    Id = 1,
                    Title = "Title 1",
                    Author = "Author 1",
                    Bookmarks = new List<Bookmark>()
                },
                new Quote
                {
                    Id = 2,
                    Title = "Title 2",
                    Author = "Author 2",
                    Bookmarks = new List<Bookmark>()
                },
                new Quote
                {
                    Id = 3,
                    Title = "Title 3",
                    Author = "Author 3",
                    Bookmarks = new List<Bookmark>()
                }
            };
        }
    }
}
