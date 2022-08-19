using GMQ_Quotes.Data;
using GMQ_Quotes.Data.DTO;
using GMQ_Quotes.Data.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace GMQ_Quotes.Services
{
    public class RabbitMQService : IRabbitMQService
    {
        private readonly IConfiguration config;
        private readonly IServiceScopeFactory serviceScopeFactory;
        private readonly IConnection connection;
        private readonly IModel userChannel;

        public RabbitMQService(IConfiguration config, IServiceScopeFactory serviceScopeFactory)
        {
            this.config = config;
            this.serviceScopeFactory = serviceScopeFactory;
            connection = CreateConnection();
            userChannel = connection.CreateModel();
        }

        public IConnection CreateConnection()
        {
            var conFactory = new ConnectionFactory
            {
                Uri = new Uri(config["RabbitMQ:ConString"]),
                AutomaticRecoveryEnabled = true,
                DispatchConsumersAsync = true
            };

            return conFactory.CreateConnection("GMQ_Quotes");
        }

        public void PublishIssue(Issue issue)
        {
            string issueString = JsonSerializer.Serialize(issue);

            using var channel = connection.CreateModel();

            var properties = channel.CreateBasicProperties();
            properties.DeliveryMode = 2;

            channel.BasicPublish(config["RabbitMQ:Exchange"], config["RabbitMQ:EmailKey"], properties, Encoding.UTF8.GetBytes(issueString));
        }

        public void SubscribeUser()
        {
            userChannel.BasicQos(0, 1, false);

            var userChannelConsumer = new AsyncEventingBasicConsumer(userChannel);
            userChannelConsumer.Received += UserChannelConsumer_Received;
            userChannel.BasicConsume(config["RabbitMQ:UserQ"], false, userChannelConsumer);
        }

        private async Task<Task> UserChannelConsumer_Received(object sender, BasicDeliverEventArgs e)
        {
            string res = Encoding.UTF8.GetString(e.Body.ToArray());
            User? user = JsonSerializer.Deserialize<User>(res);

            await AddUserToDb(user!);

            userChannel.BasicAck(e.DeliveryTag, false);

            return Task.CompletedTask;
        }

        private async Task AddUserToDb(User user)
        {
            try
            {
                using var scope = serviceScopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
            }
            catch (Exception) { }
        }
    }
}
