using RabbitMQ.Client;

namespace GMQ_Email.Services
{
    public interface IRabbitMQService
    {
        public IConnection CreateConnection();
        public void SubscribeEmail();
    }
}
