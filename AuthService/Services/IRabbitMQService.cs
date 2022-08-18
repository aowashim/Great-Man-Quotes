using AuthService.Data.Models;
using RabbitMQ.Client;

namespace AuthService.Services
{
    public interface IRabbitMQService
    {
        public IConnection CreateConnection();
        public void PublishUser(SignUp signUpModel);
    }
}
