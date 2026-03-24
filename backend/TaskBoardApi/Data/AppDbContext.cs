using Microsoft.EntityFrameworkCore;
using TaskBoardApi.Models;

namespace TaskBoardApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) 
        { 
        }

        public DbSet<Board> Boards { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>().Property(t => t.Status).HasConversion<string>(); 
        }
    }
}
