using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace GMQ_Quotes.Data.Models
{
    [Index(nameof(UserUsername), nameof(QuoteId), IsUnique = true)]
    public class Bookmark
    {
        public int Id { get; set; }

        [Required]
        public string UserUsername { get; set; } = string.Empty;

        [Required]
        public int QuoteId { get; set; }
    }
}
