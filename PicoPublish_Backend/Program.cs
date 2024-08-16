var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()  // Allow all origins
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

var productList = MockProducts.GetMockProducts(); // returns a list of mock products

app.MapGet("/products", (int page, string? type = null) =>
{
    // filter the products based on the type. If the type is null, return all products
    var filteredProducts = string.IsNullOrEmpty(type) ? productList : productList.Where(p => p.Type == type).ToList();

    // calculates the number of items to skip because of pageination
    var skip_number = page * Constants.PAGESIZE;
    var selectedProducts = filteredProducts.Skip(skip_number).Take(Constants.PAGESIZE);

    return Results.Ok(selectedProducts);
})
.WithOpenApi();

app.MapPost("/products", (ProductDto product) =>
{
    Console.WriteLine($"Received product: Id={product.Id}, Name={product.Name}, Description={product.Description}, Type={product.Type}");
    IProduct newProduct;
    if (product.Type == ProductTypes.HAMMER)
    {
        newProduct = new Hammer(product.Name, product.Description, 0.0);
    } else
    {
        newProduct = new Nail(product.Name, product.Description, 0.0);
    }
    productList.Add(newProduct);
    return Results.Ok(newProduct);
})
.WithOpenApi();

app.MapDelete("/products/{id}", (Guid id) =>
{
    Console.WriteLine($"Received request to delete product with id: {id}");
    var product = productList.FirstOrDefault(p => p.Id.Equals(id));
    if (product == null)
    {
        return Results.NotFound();
    }
    
    productList.Remove(product);
    return Results.Ok();
})
.WithOpenApi();

app.MapPut("/products/{id}", (Guid id, ProductDto updatedProduct) =>
{
    Console.WriteLine($"Received request to update product with id: {id}");
    var product = productList.FirstOrDefault(p => p.Id.Equals(id));
    if (product == null)
    {
        return Results.NotFound();
    }

    product.Name = updatedProduct.Name;
    product.Description = updatedProduct.Description;
    product.Type = updatedProduct.Type;
    
    return Results.Ok(product);
})
.WithOpenApi();

app.Run();
