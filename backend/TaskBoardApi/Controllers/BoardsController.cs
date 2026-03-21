using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoardApi.Data;
using TaskBoardApi.DTOs;

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
    }
