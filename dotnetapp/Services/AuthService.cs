using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        // Register user
        public async Task<(int, string)> Registration(User model, string role)
        {
            try
            {
                // Check if user already exists
                var existingUser = await _userManager.FindByEmailAsync(model.Email);
                if (existingUser != null)
                    return (0, "User already exists");

                // Create new user
                var newUser = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.Username
                };

                var result = await _userManager.CreateAsync(newUser, model.Password);
                if (!result.Succeeded)
                    {
                        var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                        return (0, $"User creation failed! Errors: {errors}");
                    }

                // Ensure role exists
                if (!await _roleManager.RoleExistsAsync(role))
                    await _roleManager.CreateAsync(new IdentityRole(role));

                // Assign role to user
                await _userManager.AddToRoleAsync(newUser, role);

                return (1, "User created successfully!");
            }
            catch (Exception ex)
            {
                return (0, $"Error registering user: {ex.Message}");
            }
        }

        // Login user
        public async Task<(int, string)> Login(LoginModel model)
{
    if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
        return (0, "Email or password cannot be empty.");

    var user = await _userManager.FindByEmailAsync(model.Email);
    
    // 🔹 Debugging log
    Console.WriteLine($"User found: {user?.Email}");
    Console.WriteLine($"UserName: {user?.UserName}");
    Console.WriteLine($"PasswordHash: {user?.PasswordHash}");

    if (user == null)
        return (0, "Invalid email");

    if (string.IsNullOrEmpty(user.PasswordHash))
        return (0, "User password is missing. Try resetting your password.");

    if (!await _userManager.CheckPasswordAsync(user, model.Password))
        return (0, "Invalid password");

    var token = GenerateToken(new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, string.Join(",", await _userManager.GetRolesAsync(user))) // Ensure roles are included
    });

    return (1, token);
}



        // Generate JWT Token
        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
