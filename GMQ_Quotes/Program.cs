using GMQ_Quotes.Data;
using GMQ_Quotes.Helpers;
using GMQ_Quotes.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IQuoteService, QuoteService>();
builder.Services.AddSingleton<IRabbitMQService, RabbitMQService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//RabbitMQService rabbitMQService = new(builder.Configuration);
//rabbitMQService.SubscribeUser();

Subscribe.Start(app);

app.Run();
