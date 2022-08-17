using AuthService.Data;
using AuthService.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthService.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserService(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration,
            AppDbContext context, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> SignUpAsync(SignUp signUpModel)
        {
            try
            {           
                var user = new IdentityUser
                {
                    Email = signUpModel.Email,
                    UserName = signUpModel.Email,                   
                };

                return await _userManager.CreateAsync(user, signUpModel.Password);
            }
            catch (Exception)
            {
                return IdentityResult.Failed();
            }
        }

        public async Task<string?> LoginAsync(SignIn signModel)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(signModel.EmpId.ToString(), signModel.Password, false, false);

                if (!result.Succeeded) return null;

                var authClaims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, signModel.EmpId.ToString())
                };

                var authSignInKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddDays(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256Signature)
                    );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Tuple<bool, string>> CreateRole(string roleName)
        {
            try
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
                
                return new Tuple<bool,string>(true, roleName);
            }
            catch (Exception ex)
            {
                return new Tuple<bool, string>(false, ex.Message);
            }
        }
    }
}
