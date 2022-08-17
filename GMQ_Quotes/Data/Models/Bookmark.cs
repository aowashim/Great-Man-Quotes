using System.ComponentModel.DataAnnotations;

namespace GMQ_Quotes.Data.Models
{
    public class Bookmark
    {
        public int Id { get; set; }

        [Required]
        public string UserUsername { get; set; } = string.Empty;
        public User User { get; set; } = new User();

        [Required]
        public int QuoteId { get; set; }
        public Quote Quote { get; set; } = new Quote();
    }
}
