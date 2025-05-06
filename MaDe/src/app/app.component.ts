import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MaDe';
  meetings = {
    '2024-04-05': ['Dring Coffee', 'Learn React', 'Sleep'],
    '2024-04-06': ['Dring Coffee', 'Learn Angular', 'Sleep'],
  };
}
