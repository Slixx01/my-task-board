using FluentValidation;
using TaskBoardApi.DTOs;

namespace TaskBoardApi.Validations
{
    public class CreateTaskValidator : AbstractValidator<CreateTaskDto>
    {
        public CreateTaskValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Icon).NotEmpty();

        }
    }
}
