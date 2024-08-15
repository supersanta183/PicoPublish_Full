class Nail(String name, String description, double length) : IProduct
{
    public Guid Id { get; set; } = Guid.NewGuid(); // generates a unique for the product
    public string Name { get; set; } = name;
    public string Description { get; set; } = description;
    public string Type { get; set; } = ProductTypes.NAIL;
    public double Length {get; set;} = length;
}