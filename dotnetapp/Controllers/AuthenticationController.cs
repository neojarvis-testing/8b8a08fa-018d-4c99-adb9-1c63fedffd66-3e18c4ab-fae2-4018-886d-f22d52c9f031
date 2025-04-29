using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel lModel)
        {
            Console.WriteLine($"Attempting login for email: {lModel.Email}");
            var result = await _authService.Login(lModel);
            if (result.Item1 == 0)
                return Unauthorized(new { message = result.Item2 });

            return Ok(new { token = result.Item2 });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User rModel)
        {
            var result = await _authService.Registration(rModel, rModel.UserRole);
            if (result.Item1 == 0)
                return BadRequest(new { message = result.Item2 });

            return Ok(new { message = result.Item2 });
        }
    }
}
