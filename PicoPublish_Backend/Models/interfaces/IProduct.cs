
// This interface is used to define the properties that all products should contain.
public interface IProduct
{
    public Guid Id { get; set; }
    String Name { get; set; }
    String Description { get; set; }
    string Type {get; set;}
}

// This class is used to define the possible types of products.
public static class ProductTypes
{
    public const string HAMMER = "HAMMER";
    public const string NAIL = "NAIL";
}