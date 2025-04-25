using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CookingHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookingClassController : ControllerBase
    {
        private readonly ICookingClassService _cookingClassService;

        public CookingClassController(ICookingClassService cookingClassService)
        {
            _cookingClassService = cookingClassService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CookingClass>>> GetAllCookingClasses()
        {
            try
            {
                var cookingClasses = await _cookingClassService.GetAllCookingClasses();
                return Ok(cookingClasses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{classId}")]
        public async Task<ActionResult<CookingClass>> GetCookingClassById(int classId)
        {
            try
            {
                var cookingClass = await _cookingClassService.GetCookingClassById(classId);
                if (cookingClass == null)
                {
                    return NotFound("Cannot find any cooking");
                }
                return Ok(cookingClass);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddCookingClass([FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.AddCookingClass(cooking);
                if (result)
                {
                    return Ok("Cooking class added successfully");
                }
                return StatusCode(500, "Failed to add cooking class");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{classId}")]
        public async Task<ActionResult> UpdateCookingClass(int classId, [FromBody] CookingClass cooking)
        {
            try
            {
                var updated = await _cookingClassService.UpdateCookingClass(classId, cooking);
                if (!updated)
                {
                    return NotFound("Cannot find any cooking");
                }
                return Ok("Cooking class updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{classId}")]
        public async Task<ActionResult> DeleteCookingClass(int classId)
        {
            try
            {
                var deleted = await _cookingClassService.DeleteCookingClass(classId);
                if (!deleted)
                {
                    return NotFound("Cannot find any cooking");
                }
                return Ok("Cooking class deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
