// using dotnetapp.Data;
// using dotnetapp.Services;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using dotnetapp.Models;

// var builder = WebApplication.CreateBuilder(args);

// // Configure database connection
// builder.Services.AddDbContext<ApplicationDbContext>(o => 
//     o.UseSqlServer(builder.Configuration.GetConnectionString("conn")));

// // Configure Identity
// builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
//     .AddEntityFrameworkStores<ApplicationDbContext>()
//     .AddDefaultTokenProviders();

// // Register services for dependency injection
// builder.Services.AddScoped<IAuthService, AuthService>();
// builder.Services.AddScoped<CookingClassService>();
// builder.Services.AddScoped<CookingClassRequestService>();
// builder.Services.AddScoped<FeedbackService>();

// // Add controllers
// builder.Services.AddControllers();
// builder.Configuration
//     .SetBasePath(Directory.GetCurrentDirectory())
//     .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//     .AddEnvironmentVariables();

// // Configure Swagger (for API documentation)
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // Configure authentication middleware
// builder.Services.AddAuthentication()
//     .AddJwtBearer(options =>
//     {
//         options.RequireHttpsMetadata = false;
//         options.SaveToken = true;
//         options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
//         {
//             ValidateIssuer = false,
//             ValidateAudience = false,
//             ValidIssuer = builder.Configuration["Jwt:Issuer"],
//             ValidAudience = builder.Configuration["Jwt:Audience"],
//             IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
//                 System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Token"]))
//         };
//     });

// var app = builder.Build();

// // Middleware configuration
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseAuthentication(); // Enable authentication
// app.UseAuthorization();

// app.MapControllers();

// app.Run();




using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
 
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Text;
 
 
var builder = WebApplication.CreateBuilder(args);
 
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();
 
// Add services to the container.
 
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
// Configure database connection
builder.Services.AddDbContext<ApplicationDbContext>(o => 
    o.UseSqlServer(builder.Configuration.GetConnectionString("conn")));
builder.Services.AddCors(opttions=>{
    opttions.AddDefaultPolicy(builder=>{
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Register services for dependency injection
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<CookingClassService>();
builder.Services.AddScoped<CookingClassRequestService>();
builder.Services.AddScoped<FeedbackService>();
   
    builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
    });
 
 
    builder.Services.AddSwaggerGen();
 
    var app = builder.Build();
 
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
 
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();
app.MapControllers();
app.Run();