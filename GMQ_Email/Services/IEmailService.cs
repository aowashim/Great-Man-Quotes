using GMQ_Email.Data;

namespace GMQ_Email.Services
{
    public interface IEmailService
    {
        bool SendEmail(Issue issue);
    }
}
