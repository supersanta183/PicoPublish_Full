class Hammer(String name, String description, double weight) : IProduct
{
    public Guid Id { get; set; } = Guid.NewGuid(); // generates a unique for the product
    public string Name { get; set; } = name;
    public string Description { get; set; } = description;
    public string Type { get; set; } = ProductTypes.HAMMER;
    public double Weight {get; set;} = weight;
}