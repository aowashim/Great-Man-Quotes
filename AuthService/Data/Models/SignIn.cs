using System.ComponentModel.DataAnnotations;

namespace AuthService.Data.Models
{
    public class SignIn
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
