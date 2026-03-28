using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoardApi.Data;
using TaskBoardApi.DTOs;
using TaskBoardApi.Models;

namespace TaskBoardApi.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TaskController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost("~/api/boards/{boardId}/tasks")]
        public async Task<IActionResult> AddTask(Guid boardId, [FromBody] CreateTaskDto dto)
        {
            var board = await _context.Boards.FirstOrDefaultAsync(b => b.Id == boardId);
            if (board == null) { return NotFound(); }

            var tasks = new TaskItem
            {
                BoardId = boardId,
                Name = dto.Name,
                Description = dto.Description,
                Icon = dto.Icon,
                Status = dto.Status,
            };

            _context.TaskItems.Add(tasks);
            await _context.SaveChangesAsync();


            return Created(string.Empty, new TaskResponseDto
            {
                Id = tasks.Id,
                BoardId = boardId,
                Name = tasks.Name,
                Description = tasks.Description,
                Icon = tasks.Icon,
                Status = tasks.Status,
                DisplayOrder = tasks.DisplayOrder,
                CreatedAt = tasks.CreatedAt,
            });

        }


        [HttpPut("{taskId}")]
        public async Task<IActionResult> UpdateTask(Guid taskId, [FromBody] UpdateTaskDto dto)
        {
            var task = await _context.TaskItems.FirstOrDefaultAsync(b => b.Id == taskId);
            if (task == null) { return NotFound(); }

            task.Name = dto.Name;
            task.Description = dto.Description;
            task.Icon = dto.Icon;
            task.Status = dto.Status;

            await _context.SaveChangesAsync(); 
            var taskResponse = new TaskResponseDto 
            {
                Id = task.Id,
                BoardId = task.BoardId,
                Name = task.Name,
                Description = task.Description,
                Icon = task.Icon,
                Status = task.Status,
                DisplayOrder = task.DisplayOrder,
                CreatedAt = task.CreatedAt,
                AttachmentUrl = task.AttachmentUrl
            };

            return Ok(taskResponse);

        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(Guid taskId)
        {
            var task = await _context.TaskItems.FirstOrDefaultAsync(b=> b.Id == taskId);
            if(task == null) { return NotFound(); }
            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync(); 

            return NoContent(); 
        }

    }
}
