using GMQ_Quotes.Data.DTO;
using GMQ_Quotes.Data.Models;
using System.Collections.Generic;

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

        public static List<Quote>? GetNull()
        {
            return null;
        }

        public static Quote GetOneQuote(bool retFilled = true)
        {
            return retFilled ? new Quote
            {
                Id = 0,
                Title = "Title 1",
                Author = "Author 1",
                Bookmarks = new List<Bookmark>()
            } : new Quote();
        }

        public static Issue GetIssue()
        {
            return new Issue()
            {
                Email = "owa123@gmail.com",
                Subject = "Subject",
                Body = "Body"
            };
        }
    }
}
