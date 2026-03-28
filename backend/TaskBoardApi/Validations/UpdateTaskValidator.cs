using FluentValidation;
using TaskBoardApi.DTOs;

namespace TaskBoardApi.Validations
{
    public class UpdateTaskValidator: AbstractValidator<UpdateTaskDto>
    {
        public UpdateTaskValidator() 
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            
            RuleFor(x => x.Icon).NotEmpty();
        }
    }
}
