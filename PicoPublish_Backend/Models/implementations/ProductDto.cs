// object for transferring product data between the client and server
public class ProductDto(Guid id, String name, String description, string type, double? length = null, double? weight = null)
{
    public Guid Id { get; set; } = id;
    public string Name { get; set; } = name;
    public string Description { get; set; } = description;
    public string Type { get; set; } = type;
    public double? Length { get; set; } = length;
    public double? Weight { get; set; } = weight;
}