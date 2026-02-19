import { ChangeDetectorRef, Component, OnInit, ɵinjectChangeDetectorRef } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
// component
books: Book[] = [];
isLoading = true;

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}

  loadBooks(): void {
  this.isLoading = true;
  this.bookService.getBooks().subscribe({
    next: data => {
      this.books = [...data];
      this.isLoading = false;
      this.cdr.detectChanges(); // force Angular to update the view
    },
    error: err => {
      console.error('Failed to load books', err);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}

  ngOnInit(): void {
    this.loadBooks();
  }


  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }
}
