import { Component } from '@angular/core';
import { MapsComponent } from './maps/maps.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@Component({
  selector: 'app-pagina-mappa',
  imports: [MapsComponent],
  templateUrl: './pagina-mappa.component.html',
  styleUrl: './pagina-mappa.component.css',
  providers: [],
  animations: [
    trigger('openClose', [
      state('closed', style({transform: "translate(120%)"})),
      state('open', style({transform: "translate(0)"})),
      transition('closed => open', [animate('1s ease-in')])
    ])
  ]
})
export class PaginaMappaComponent {

}

bootstrapApplication(MapsComponent,{
  providers: [
    provideAnimationsAsync()
  ]
});
