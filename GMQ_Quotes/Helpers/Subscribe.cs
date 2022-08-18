using GMQ_Quotes.Services;

namespace GMQ_Quotes.Helpers
{
    public class Subscribe
    {
        public static void Start(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            serviceScope.ServiceProvider.GetRequiredService<IRabbitMQService>().SubscribeUser();
        }
    }
}
