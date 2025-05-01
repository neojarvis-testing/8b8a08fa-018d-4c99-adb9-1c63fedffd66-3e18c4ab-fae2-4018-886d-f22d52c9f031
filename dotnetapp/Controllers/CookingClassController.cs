using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Authorization;
namespace dotnetapp.Controllers
{
    // [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/cookingClass")]
    public class CookingClassController : ControllerBase
    {
        private readonly CookingClassService _cookingClassService;

        public CookingClassController(CookingClassService cookingClassService)
        {
            _cookingClassService = cookingClassService;
        }

        // Get all cooking classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CookingClass>>> GetAllCookingClasses()
        {
            try
            {
                var classes = await _cookingClassService.GetAllCookingClasses();
                return Ok(classes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Get cooking class by ID
        [HttpGet("{classId}")]
        public async Task<ActionResult<CookingClass>> GetCookingClassById(int classId)
        {
            try
            {
                var cookingClass = await _cookingClassService.GetCookingClassById(classId);
                if (cookingClass == null)
                    return NotFound("Cannot find any cooking class with the given ID");

                return Ok(cookingClass);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Add a cooking class
        [HttpPost]
        public async Task<ActionResult> AddCookingClass([FromBody] CookingClass cooking)
        {
            // System.Console.WriteLine(cooking);
            // System.Console.WriteLine("log-----------------------------");
            try
            {
                var result = await _cookingClassService.AddCookingClass(cooking);
                if (result)
                    return Ok("Cooking class added successfully");

                return StatusCode(500, "Failed to add cooking class");
            }
            catch (CookingClassException ex)
            {
                return BadRequest(ex.Message); // Handles custom exceptions
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Update a cooking class
        [HttpPut("{classId}")]
        public async Task<ActionResult> UpdateCookingClass(int classId, [FromBody] CookingClass cooking)
        {
            try
            {
                var updated = await _cookingClassService.UpdateCookingClass(classId, cooking);
                if (!updated)
                    return NotFound("Cannot find any cooking class with the given ID");

                return Ok("Cooking class updated successfully");
            }
            catch (CookingClassException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete a cooking class
        [HttpDelete("{classId}")]
        public async Task<ActionResult> DeleteCookingClass(int classId)
        {
            try
            {
                var deleted = await _cookingClassService.DeleteCookingClass(classId);
                if (!deleted)
                    return NotFound("Cannot find any cooking class with the given ID");

                return Ok("Cooking class deleted successfully");
            }
            catch (CookingClassException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
