import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // add RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // add RouterModule here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('book-management-ui');
}