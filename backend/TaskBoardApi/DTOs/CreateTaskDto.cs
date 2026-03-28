using TaskBoardApi.Models;

namespace TaskBoardApi.DTOs
{
    public class CreateTaskDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Icon { get; set; }
        public BoardTaskStatus Status { get; set; }

    }
}
