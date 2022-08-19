using GMQ_Email.Data;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace GMQ_Email.Services
{
    public class RabbitMQService : IRabbitMQService
    {
        private readonly IConfiguration config;
        private readonly IServiceScopeFactory serviceScopeFactory;
        private readonly IConnection connection;
        private readonly IModel emailChannel;

        public RabbitMQService(IConfiguration config, IServiceScopeFactory serviceScopeFactory)
        {
            this.config = config;
            this.serviceScopeFactory = serviceScopeFactory;
            connection = CreateConnection();
            emailChannel = connection.CreateModel();
        }

        public IConnection CreateConnection()
        {
            var conFactory = new ConnectionFactory
            {
                Uri = new Uri(config["RabbitMQ:ConString"]),
                AutomaticRecoveryEnabled = true,
                DispatchConsumersAsync = true
            };

            return conFactory.CreateConnection("GMQ_Email");
        }

        public void SubscribeEmail()
        {
            emailChannel.BasicQos(0, 1, false);

            var emailChannelConsumer = new AsyncEventingBasicConsumer(emailChannel);
            emailChannelConsumer.Received += EmailChannelConsumer_Received;
            emailChannel.BasicConsume(config["RabbitMQ:EmailQ"], false, emailChannelConsumer);
        }

        private Task EmailChannelConsumer_Received(object sender, BasicDeliverEventArgs e)
        {
            string res = Encoding.UTF8.GetString(e.Body.ToArray());
            Issue? issue = JsonSerializer.Deserialize<Issue>(res);

            SendEmail(issue!);

            emailChannel.BasicAck(e.DeliveryTag, false);

            return Task.CompletedTask;
        }

        private void SendEmail(Issue issue)
        {
            try
            {
                using var scope = serviceScopeFactory.CreateScope();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

                emailService.SendEmail(issue);
            }
            catch (Exception) { }
        }
    }
}
