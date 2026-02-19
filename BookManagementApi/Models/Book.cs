namespace BookManagementApi.Models
{
    public class Book
    {
        public int Id { get; set; }                 // Unique identifier
        public string Title { get; set; } = "";     // Book title
        public string Author { get; set; } = "";    // Author name
        public string ISBN { get; set; } = "";      // ISBN number
        public DateTime PublicationDate { get; set; } // Publication date
    }
}
