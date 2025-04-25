using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string MobileNumber { get; set; }
        public string UserRole { get; set; }

        public ICollection<CookingClassRequest> CookingClassRequests { get; set; } = new List<CookingClassRequest>();
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    }
}