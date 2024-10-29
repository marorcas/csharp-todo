using Microsoft.EntityFrameworkCore;
using TodoApi.Data;

public class Startup
{
    public void ConfigureServices(IServiceCollection services) {
        services.AddDbContext<TodoContext>(options =>
        options.UseMySql("Server=localhost;Database=TodoDb;User=root;Password=MyPass;", 
        new MySqlServerVersion(new Version(8, 0, 21))));
    
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, TodoContext context) {
        if (env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
        } else {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        // Ensure the database is created and migrations applied
        context.Database.Migrate();

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints => {
            endpoints.MapControllers();
        });
    }
}
