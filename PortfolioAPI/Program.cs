// Imports
using Microsoft.OpenApi.Models;

// Construcción de la aplicación
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();

// Generación
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo {
        Title = "Portfolio API",
        Description = "En esta API tendremos los Main Endpoints expuestos.",
        Version = "v1"
    });
});

// Montaje de la aplicación
var app = builder.Build();

// Generación de documentación Swagger
if (app.Environment.IsDevelopment()) {

    // Montaje de Swagger e Interfaz de usuario
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PortfolioAPI");
    });
}

app.MapGet("/", () => "Hello World!");

app.Run();
