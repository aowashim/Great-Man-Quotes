﻿using AuthService.Data.DTO;
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
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<UserService> logger;

        public UserService(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration,
            RoleManager<IdentityRole> roleManager, ILogger<UserService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            this.logger = logger;
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

                var res = await _userManager.CreateAsync(user, signUpModel.Password);

                if (res.Succeeded) await _userManager.AddToRoleAsync(user, "User");

                return res;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return IdentityResult.Failed();
            }
        }

        public async Task<LoginReturn?> LoginAsync(SignIn signModel)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(signModel.Username, signModel.Password, false, false);

                if (!result.Succeeded) return null;

                var user = await _userManager.FindByNameAsync(signModel.Username);
                var role = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, signModel.Username),
                    new Claim(ClaimTypes.Role, role[0])
                };

                var authSignInKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddDays(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256Signature)
                    );

                string res = new JwtSecurityTokenHandler().WriteToken(token);

                return new LoginReturn { Token = res, Type = role[0] };
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<Tuple<bool, string>> CreateRole(string roleName)
        {
            try
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));

                return new Tuple<bool, string>(true, roleName);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return new Tuple<bool, string>(false, ex.Message);
            }
        }
    }
}
