using GMQ_Quotes.Data.Models;
using RabbitMQ.Client;

namespace GMQ_Quotes.Services
{
    public interface IRabbitMQService
    {
        public IConnection CreateConnection();
        public void SubscribeUser();
    }
}
