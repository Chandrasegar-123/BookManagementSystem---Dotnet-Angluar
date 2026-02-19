import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };
  isEditMode: boolean = false;
  isLoading = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // add this
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.isLoading = true;
      this.bookService.getBook(+id).subscribe(data => {
      this.book = { 
        ...data,
        publicationDate: new Date(data.publicationDate).toISOString().split('T')[0] // converts to yyyy-MM-dd
      };
      this.isLoading = false;
      this.cdr.detectChanges();
    });
    }
  }

  saveBook(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book.id, this.book).subscribe(() => {
        alert('Book updated successfully!');
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        alert('Book added successfully!');
        this.router.navigate(['/books']);
      });
    }
  }
}