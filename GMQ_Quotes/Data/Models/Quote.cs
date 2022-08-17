using System.ComponentModel.DataAnnotations;

namespace GMQ_Quotes.Data.Models
{
    public class Quote
    {
        public int Id { get; set; }

        [Required, MaxLength(250)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(30)]
        public string Author { get; set; } = string.Empty;

        public List<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
    }
}
