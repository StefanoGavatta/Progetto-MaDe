import { Component } from '@angular/core';
import { MapsComponent } from './maps/maps.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pagina-mappa',
  imports: [MapsComponent,NgClass],
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
  bgAnimated = false;

   ngOnInit() {
    setTimeout(() => {
      this.bgAnimated = true;
    }, 100); // leggero delay per triggerare la transizione
  } 

  ngAfterViewInit() {
    this.bgAnimated = false;
    setTimeout(() => {
      this.bgAnimated = true;
    }, 100); // delay per triggerare la transizione
  }
}

bootstrapApplication(MapsComponent,{
  providers: [
    provideAnimationsAsync()
  ]
});
