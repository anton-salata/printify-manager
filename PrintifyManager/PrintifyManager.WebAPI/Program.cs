using Microsoft.Extensions.Options;
using PrintifyManager.SDK;
using PrintifyManager.WebAPI.Services;
using PrintifyManager.WebAPI.Settings;

namespace PrintifyManager.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.Configure<PrintifySettings>(builder.Configuration.GetSection("PrintifySettings"));
            builder.Services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<PrintifySettings>>().Value);

            builder.Services.AddHttpClient<HttpClient>("PrintifyHttpClient");

            builder.Services.AddScoped<PrintifyClient>((sp) =>
            {
                var settings = sp.GetRequiredService<PrintifySettings>();
                var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
                return new PrintifyClient(httpClientFactory, settings.ApiKey);
            });

            builder.Services.AddScoped<PrintifyService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost", builder =>
                {
                    builder.WithOrigins("http://localhost:3000") // Update with your React app's URL
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                });
            });

            var app = builder.Build();

            app.UseCors("AllowLocalhost");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}