using System.Collections.Generic;

public static class MockProducts
{
    public static List<IProduct> GetMockProducts()
    {
        return new List<IProduct>
        {
            new Nail("7 inch nail", "a nail of 7 inches", 7.0),
            new Nail("8 inch nail", "a nail of 8 inches", 8.0),
            new Nail("9 inch nail", "a nail of 9 inches", 9.0),
            new Nail("10 inch nail", "a nail of 10 inches", 10.0),
            new Nail("11 inch nail", "a nail of 11 inches", 11.0),
            new Hammer("5 pound hammer", "A hammer that weighs 5 pounds", 5.0),
            new Hammer("6 pound hammer", "A hammer that weighs 6 pounds", 6.0),
            new Hammer("7 pound hammer", "A hammer that weighs 7 pounds", 7.0),
            new Hammer("8 pound hammer", "A hammer that weighs 8 pounds", 8.0),
            new Hammer("9 pound hammer", "A hammer that weighs 9 pounds", 9.0),
            new Hammer("10 pound hammer", "A hammer that weighs 10 pounds", 10.0),
            new Hammer("11 pound hammer", "A hammer that weighs 11 pounds", 11.0)
        };
    }
}