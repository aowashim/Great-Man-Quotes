using AuthService.Data.DTO;
using AuthService.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace AuthService.Services
{
    public interface IUserService
    {
        Task<IdentityResult> SignUpAsync(SignUp signUpModel);
        Task<LoginReturn?> LoginAsync(SignIn signModel);
        Task<Tuple<bool, string>> CreateRole(string roleName);
    }
}
