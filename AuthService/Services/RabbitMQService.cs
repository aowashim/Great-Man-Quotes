using AuthService.Data.DTO;
using AuthService.Data.Models;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace AuthService.Services
{
    public class RabbitMQService: IRabbitMQService
    {
        private readonly IConfiguration config;
        private readonly IConnection connection;

        public RabbitMQService(IConfiguration config)
        {
            this.config = config;
            connection = CreateConnection();
        }
        
        public IConnection CreateConnection()
        {
            var conFactory = new ConnectionFactory
            {
                Uri = new Uri(config["RabbitMQ:ConString"]),
                AutomaticRecoveryEnabled = true,
                DispatchConsumersAsync = true
            };

            return conFactory.CreateConnection("GMQ_Auth");
        }

        public void PublishUser(SignUp signUpModel)
        {
            User user = new()
            {
                Username = signUpModel.Email,
                Name = signUpModel.Name,
                City = signUpModel.City,
            };

            string userString = JsonSerializer.Serialize(user);

            using var channel = connection.CreateModel();

            var properties = channel.CreateBasicProperties();
            properties.DeliveryMode = 2;

            channel.BasicPublish(config["RabbitMQ:Exchange"], config["RabbitMQ:UserKey"], properties, Encoding.UTF8.GetBytes(userString));
        }
    }
}
