using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class CookingClassRequestService
    {
        private readonly ApplicationDbContext _context;

        public CookingClassRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all cooking class requests including related CookingClass & User details
        public async Task<IEnumerable<CookingClassRequest>> GetAllCookingClassRequests()
        {
            return await _context.CookingClassRequests
                .Include(cr => cr.CookingClass)
                .Include(cr => cr.User)
                .ToListAsync();
        }

        // Get cooking class requests for a specific user
        public async Task<IEnumerable<CookingClassRequest>> GetCookingClassRequestsByUserId(int userId)
        {
            return await _context.CookingClassRequests
                .Include(cr => cr.CookingClass)
                .Where(cr => cr.UserId == userId)
                .ToListAsync();
        }

        // Add a new cooking class request
        public async Task<bool> AddCookingClassRequest(CookingClassRequest request)
        {
            var existingRequest = await _context.CookingClassRequests.FirstOrDefaultAsync(cr => 
                cr.UserId == request.UserId && cr.CookingClassId == request.CookingClassId);

            if (existingRequest != null)
                throw new CookingClassException("User already requested this cooking class");

            _context.CookingClassRequests.Add(request);
            await _context.SaveChangesAsync();
            return true;
        }

        // Update a cooking class request
        public async Task<bool> UpdateCookingClassRequest(int requestId, CookingClassRequest request)
        {
            var existingRequest = await _context.CookingClassRequests.FindAsync(requestId);
            if (existingRequest == null)
                return false;

            existingRequest.Status = request.Status;
            existingRequest.DietaryPreferences = request.DietaryPreferences;
            existingRequest.CookingGoals = request.CookingGoals;
            existingRequest.Comments = request.Comments;

            await _context.SaveChangesAsync();
            return true;
        }

        // Delete a cooking class request
        public async Task<bool> DeleteCookingClassRequest(int requestId)
        {
            var request = await _context.CookingClassRequests.FindAsync(requestId);
            if (request == null)
                return false;

            _context.CookingClassRequests.Remove(request);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
