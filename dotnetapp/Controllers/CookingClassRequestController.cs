using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CookingHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookingClassRequestController : ControllerBase
    {
        private readonly ICookingClassRequestService _cookingClassRequestService;

        public CookingClassRequestController(ICookingClassRequestService cookingClassRequestService)
        {
            _cookingClassRequestService = cookingClassRequestService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CookingClassRequest>>> GetAllCookingClassRequests()
        {
            try
            {
                var requests = await _cookingClassRequestService.GetAllCookingClassRequests();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CookingClassRequest>>> GetCookingClassRequestsByUserId(int userId)
        {
            try
            {
                var requests = await _cookingClassRequestService.GetCookingClassRequestsByUserId(userId);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddCookingClassRequest([FromBody] CookingClassRequest request)
        {
            try
            {
                var result = await _cookingClassRequestService.AddCookingClassRequest(request);
                if (result)
                {
                    return Ok("Cooking class request added successfully");
                }
                return StatusCode(500, "Failed to add cooking class request");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{requestId}")]
        public async Task<ActionResult> UpdateCookingClassRequest(int requestId, [FromBody] CookingClassRequest request)
        {
            try
            {
                var updated = await _cookingClassRequestService.UpdateCookingClassRequest(requestId, request);
                if (!updated)
                {
                    return NotFound("Cannot find the request");
                }
                return Ok("Cooking class request updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{requestId}")]
        public async Task<ActionResult> DeleteCookingClassRequest(int requestId)
        {
            try
            {
                var deleted = await _cookingClassRequestService.DeleteCookingClassRequest(requestId);
                if (!deleted)
                {
                    return NotFound("Cannot find the request");
                }
                return Ok("Cooking class request deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
