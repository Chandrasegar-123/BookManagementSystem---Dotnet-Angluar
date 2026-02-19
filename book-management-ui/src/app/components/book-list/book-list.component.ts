import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  books: Book[] = [];
  isLoading = true;
  

  // pagination
  currentPage = 1;
  pageSize = 5;

  get totalPages(): number {
    return Math.ceil(this.books.length / this.pageSize);
  }

  get paginatedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.books.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: data => {
        this.books = [...data];
        this.isLoading = false;
        this.currentPage = 1;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Failed to load books', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  showDeleteModal = false;
  bookToDeleteId: number | null = null;

  confirmDelete(id: number): void {
  this.bookToDeleteId = id;
  this.showDeleteModal = true;
}

cancelDelete(): void {
  this.showDeleteModal = false;
  this.bookToDeleteId = null;
}

deleteBook(): void {
  if (this.bookToDeleteId !== null) {
    this.bookService.deleteBook(this.bookToDeleteId).subscribe(() => {
      this.showDeleteModal = false;
      this.bookToDeleteId = null;
      this.loadBooks();
    });
  }
}
}