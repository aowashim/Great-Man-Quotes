using System.ComponentModel.DataAnnotations;

namespace AuthService.Data.Models
{
    public class SignUp
    {
        [Required, MaxLength(30)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Compare("ConfirmPassword")]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string City { get; set; } = string.Empty;
    }
}
