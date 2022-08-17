using System.ComponentModel.DataAnnotations;

namespace AuthService.Data.Models
{
    public class SignIn
    {
        [Required]
        public int EmpId { get; set; }

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
