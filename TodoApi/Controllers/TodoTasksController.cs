using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http.Features;

namespace TodoApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTasksController : ControllerBase {
        private readonly TodoContext _context;

        public TodoTasksController(TodoContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoTask>>> GetAll() {
            var tasks = await _context.TodoTasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetById(long id) {
            var task = await _context.TodoTasks.FindAsync(id);
            if (task == null) return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TodoTask>> Create(TodoTask task) {
            _context.TodoTasks.Add(task);
            await _context.SaveChangesAsync();
            return StatusCode(201, task);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpdateTodoTask data) {
            var task = await _context.TodoTasks.FindAsync(id);
            if (task == null) return NotFound();

            if (data.Completed.HasValue) {
                task.Completed = data.Completed.Value;
            }

            if (data.Priority.HasValue) {
                task.Priority = data.Priority.Value;
            }

            await _context.SaveChangesAsync();
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id) {
            var task = await _context.TodoTasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.TodoTasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    
}