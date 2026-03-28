using FluentValidation;
using TaskBoardApi.DTOs;

namespace TaskBoardApi.Validations
{
    public class UpdateBoardValidator: AbstractValidator<UpdateBoardDto>
    {
        public UpdateBoardValidator() 
        {
            RuleFor(x=> x.Name).NotEmpty().MaximumLength(200);
            
        }
    }
}
