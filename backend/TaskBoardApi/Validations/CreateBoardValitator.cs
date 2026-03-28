using FluentValidation;
using TaskBoardApi.DTOs;

namespace TaskBoardApi.Validations
{
    public class CreateBoardValitator : AbstractValidator<CreateBoardDto>
    {

        public CreateBoardValitator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);

        }
    }
}
