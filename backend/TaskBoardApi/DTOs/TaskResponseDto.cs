using TaskBoardApi.Models;

namespace TaskBoardApi.DTOs
{
    public class TaskResponseDto
    {
        public Guid Id { get; set; }
        public Guid BoardId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public BoardTaskStatus Status { get; set; }
        public string Icon { get; set; }
        public string? AttachmentUrl { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedAt { get; set; }
     

    }
}
