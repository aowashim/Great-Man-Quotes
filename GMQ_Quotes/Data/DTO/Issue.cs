using System.ComponentModel.DataAnnotations;

namespace GMQ_Quotes.Data.DTO
{
    public class Issue
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required, MaxLength(50)]
        public string Subject { get; set; } = string.Empty;

        [Required, MaxLength (500)]
        public string Body { get; set; } = string.Empty;
    }
}
