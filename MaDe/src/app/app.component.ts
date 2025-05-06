import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MaDe';
}
