namespace TaskBoardApi.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; } = Guid.NewGuid(); 
        public Guid BoardId { get; set; }
        public string Name { get; set; } = string.Empty; 
        public string? Description { get; set; }
        public string Icon { get; set; } = "📋"; 
        public BoardTaskStatus Status { get; set;  } = BoardTaskStatus.InProgress; 
        public string? AttachmentUrl { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
        public Board Board { get; set; } = null!;
    }
}
