using GMQ_Email.Services;

namespace GMQ_Email.Helpers
{
    public class Subscribe
    {
        public static void Start(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            serviceScope.ServiceProvider.GetRequiredService<IRabbitMQService>().SubscribeEmail();
        }
    }
}
