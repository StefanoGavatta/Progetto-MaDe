import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MapsComponent } from './components/maps/maps.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarioComponent,MapsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MaDe';
  meetings = {
    '2024-04-05': ["test1", "test2", "test2", "test2", "test2", "test2", "test2"],
  };
}
