using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoardApi.Data;
using TaskBoardApi.DTOs;
using TaskBoardApi.Models;

namespace TaskBoardApi.Controllers
{
    [ApiController]
    [Route("api/boards")]
    public class BoardsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BoardsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetBoard(Guid id)
        {
            var board = await _context.Boards.Include(b => b.Tasks).FirstOrDefaultAsync(b => b.Id == id);
            if (board == null) { return NotFound(); }

            var boardDto = new BoardResponseDto
            {
                Id = id,
                Name = board.Name,
                Description = board.Description,
                CreatedAt = board.CreatedAt,
                Items = board.Tasks.Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    BoardId = t.BoardId,
                    AttachmentUrl = t.AttachmentUrl,
                    DisplayOrder = t.DisplayOrder,
                    CreatedAt = t.CreatedAt,
                    Name = t.Name,
                    Description = t.Description,
                    Status = t.Status,
                    Icon = t.Icon,
                }).ToList()
                

            };

            return Ok(boardDto);
        }


        [HttpPost]
        public async Task<IActionResult> CreateBoard([FromBody] CreateBoardDto dto)
        {

            var board = new Board
            {
                Name = dto.Name,
                Description = dto.Description,

            };
            board.Tasks.Add(new TaskItem 
            {
                Name = "Task in Progress",
                Description = "Work that i currently being done",
                Status = BoardTaskStatus.InProgress,
                DisplayOrder = 1
            });
            board.Tasks.Add(new TaskItem
            {
                Name = "Completed",
                Description = "Work that has been finished successfully",
                Status = BoardTaskStatus.Completed,
                DisplayOrder = 2
            });
            board.Tasks.Add(new TaskItem
            {
                Name = "Won't Do",
                Description = "Work that has been deprioritsed or cancelled",
                Status = BoardTaskStatus.WontDo,
                DisplayOrder = 3
            });
            board.Tasks.Add(new TaskItem
            {
                Name = "In Progress",
                Description = "A second default task for the board",
                Status = BoardTaskStatus.InProgress,
                DisplayOrder = 4
            });



            return Ok();
        }
    }
}
