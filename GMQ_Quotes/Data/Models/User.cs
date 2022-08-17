using System.ComponentModel.DataAnnotations;

namespace GMQ_Quotes.Data.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; } = string.Empty;

        [Required, MaxLength(30)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string City { get; set; } = string.Empty;

        public List<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
    }
}
