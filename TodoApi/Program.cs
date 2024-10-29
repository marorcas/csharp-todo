var builder = WebApplication.CreateBuilder(args);

// Use Startup class for configuration
var startup = new Startup();
startup.ConfigureServices(builder.Services);

var app = builder.Build();
startup.Configure(app);

app.Run();