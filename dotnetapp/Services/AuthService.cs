using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore; // ✅ Added EF Core namespace for SingleOrDefaultAsync

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            // 🔹 Validate Email
            if (string.IsNullOrWhiteSpace(model.Email))
                return (0, "Email is required");

            // 🔹 Lookup by NormalizedEmail for case-insensitive search
            var normalizedEmail = model.Email.ToUpper();
            var userExists = await _userManager.Users.SingleOrDefaultAsync(u => u.NormalizedEmail == normalizedEmail);

            if (userExists != null)
                return (0, "User already exists");

            // 🔹 Create New User
            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                UserName = model.Username,
                PhoneNumber = model.MobileNumber,
                Name = model.Username
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return (0, "User creation failed! Please check user details and try again");

            // 🔹 Validate Role Before Assigning
            if (!await _roleManager.RoleExistsAsync(role))
                return (0, $"Role '{role}' does not exist. Please create the role first.");

            await _userManager.AddToRoleAsync(user, role);

            return (1, "User created successfully!");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            // 🔹 Validate Email
            if (string.IsNullOrWhiteSpace(model.Email))
                return (0, "Email is required");

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return (0, "Invalid email");

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                return (0, "Invalid password");

            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GenerateToken(authClaims);

            return (1, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            try
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(3),
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Token generation failed: {ex.Message}");
                return null;
            }
        }
    }
}
