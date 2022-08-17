using AuthService.Data.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUp signUpModel)
        {
            var result = await _userService.SignUpAsync(signUpModel);

            return result.Succeeded ? Ok(result) : BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] SignIn signInModel)
        {
            var result = await _userService.LoginAsync(signInModel);

            return result == null ? Unauthorized(result) : Ok(result);
        }

        [HttpPost("role/{roleName}")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            var result = await _userService.CreateRole(roleName);

            return result.Item1 ? Ok(result.Item2) : BadRequest(result.Item2);
        }
    }
}
