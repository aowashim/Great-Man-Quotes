using GMQ_Quotes.Data.DTO;
using RabbitMQ.Client;

namespace GMQ_Quotes.Services
{
    public interface IRabbitMQService
    {
        public IConnection CreateConnection();
        public void SubscribeUser();
        public void PublishIssue(Issue issue);
    }
}
