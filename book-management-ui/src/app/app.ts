import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',   // file must exist
  styleUrls: ['./app.css']     // file must exist
})
export class AppComponent {                // class name must match export
  protected readonly title = signal('book-management-ui');
}
