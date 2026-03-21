namespace TaskBoardApi.DTOs
{
    public class UpdateTaskDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
        public string Icon { get; set; }

    }
}
