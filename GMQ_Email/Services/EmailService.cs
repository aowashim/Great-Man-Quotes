using GMQ_Email.Data;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace GMQ_Email.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailService> logger;

        public EmailService(IConfiguration config, ILogger<EmailService> logger)
        {
            _config = config;
            this.logger = logger;
        }

        public bool SendEmail(Issue issue)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_config["Email:Username"]));
                email.To.Add(MailboxAddress.Parse(issue.Email));
                email.Subject = issue.Subject;
                email.Body = new TextPart(TextFormat.Text) { Text = issue.Body };

                var smtp = new SmtpClient();
                smtp.Connect(_config["Email:Host"], 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config["Email:Username"], _config["Email:Password"]);
                smtp.Send(email);
                smtp.Disconnect(true);

                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
