using TaskBoardApi.Models;

namespace TaskBoardApi.DTOs
{
    public class BoardResponseDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<TaskResponseDto> Items { get; set; }
    }
}
          