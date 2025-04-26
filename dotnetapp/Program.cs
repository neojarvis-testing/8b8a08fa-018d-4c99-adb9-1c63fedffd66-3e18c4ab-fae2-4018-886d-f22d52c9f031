using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure database connection
builder.Services.AddDbContext<ApplicationDbContext>(o => 
    o.UseSqlServer(builder.Configuration.GetConnectionString("conn")));

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Register services for dependency injection
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<CookingClassService>();
builder.Services.AddScoped<CookingClassRequestService>();
builder.Services.AddScoped<FeedbackService>();

// Add controllers
builder.Services.AddControllers();

// Configure Swagger (for API documentation)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure authentication middleware
builder.Services.AddAuthentication()
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var app = builder.Build();

// Middleware configuration
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // Enable authentication
app.UseAuthorization();

app.MapControllers();

app.Run();
