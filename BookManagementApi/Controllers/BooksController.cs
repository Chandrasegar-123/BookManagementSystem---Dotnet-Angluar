using Microsoft.AspNetCore.Mvc;
using BookManagementApi.Models;

namespace BookManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        // In-memory storage for books
        private static List<Book> _books = new List<Book>
        {
            new Book { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", ISBN = "9780132350884", PublicationDate = new DateTime(2008, 8, 1) },
            new Book { Id = 2, Title = "The Pragmatic Programmer", Author = "Andrew Hunt", ISBN = "9780201616224", PublicationDate = new DateTime(1999, 10, 30) }
        };

        // GET: api/books
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_books);
        }

        // GET: api/books/1
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public IActionResult Create(Book book)
        {
            book.Id = _books.Count > 0 ? _books.Max(b => b.Id) + 1 : 1;
            _books.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }

        // PUT: api/books/1
        [HttpPut("{id}")]
        public IActionResult Update(int id, Book updatedBook)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.ISBN = updatedBook.ISBN;
            book.PublicationDate = updatedBook.PublicationDate;

            return NoContent();
        }

        // DELETE: api/books/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();

            _books.Remove(book);
            return NoContent();
        }
    }
}
