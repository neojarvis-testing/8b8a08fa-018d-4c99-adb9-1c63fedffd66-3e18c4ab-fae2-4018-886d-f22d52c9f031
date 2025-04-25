using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<CookingClass> CookingClasses { get; set; }
        public DbSet<CookingClassRequest> CookingClassRequests { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<User> Users { get; set; }


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User - CookingClassRequests (One-to-Many)
            modelBuilder.Entity<CookingClassRequest>()
                .HasOne(cr => cr.User)
                .WithMany(u => u.CookingClassRequests)
                .HasForeignKey(cr => cr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // CookingClass - CookingClassRequests (One-to-Many)
            modelBuilder.Entity<CookingClassRequest>()
                .HasOne(cr => cr.CookingClass)
                .WithMany(c => c.CookingClassRequests)
                .HasForeignKey(cr => cr.CookingClassId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Feedback (One-to-Many)
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany(u => u.Feedbacks)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
