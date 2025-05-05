using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Dto;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface ICookingClassRequestService
    {
        // Get all cooking class requests
        Task<IEnumerable<CookingClassRequestDto>> GetAllCookingClassRequests();

        // Get cooking class requests for a specific user
        Task<IEnumerable<CookingClassRequest>> GetCookingClassRequestsByUserId(int userId);

        // Add a new cooking class request
        Task<bool> AddCookingClassRequest(CookingClassRequest request);

        // Update a cooking class request
        Task<bool> UpdateCookingClassRequest(int requestId, CookingClassRequest request);

        // Delete a cooking class request
        Task<bool> DeleteCookingClassRequest(int requestId);
    }
}