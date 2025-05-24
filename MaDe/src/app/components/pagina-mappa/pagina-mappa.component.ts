import { Component, OnInit } from '@angular/core';
import { MapsComponent } from './maps/maps.component';
import { animate, state, style, transition, trigger, group, query } from '@angular/animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pagina-mappa',
  imports: [MapsComponent, NgClass],
  templateUrl: './pagina-mappa.component.html',
  styleUrl: './pagina-mappa.component.css',
  providers: [],
animations: [
  trigger('handAnimationTrigger', [
    state('start', style({
      opacity: 1,
      backgroundColor: 'white',
      pointerEvents: 'auto'
    })),
    state('end', style({
      opacity: 1,
      pointerEvents: 'none'
    })),
    transition('start => end', [
      group([
        query('.mano-sinistra', [
          style({ left: '-100%', opacity: 0 }),
          animate('3s ease-out', style({ left: '-3.3%', opacity: 1 }))
        ], { optional: true }),
        query('.mano-destra', [
          style({ right: '-100%', opacity: 0 }),
          animate('3s ease-out', style({ right: '-3.4%', opacity: 1 }))
        ], { optional: true }),
        animate('1.8s ease-out', style({
          opacity: 1,
        }))
      ])
    ])
  ])
]
})
export class PaginaMappaComponent implements OnInit {
  protected handAnimationState: 'start' | 'end' = 'start';

  ngOnInit() {
    // Avvia l'animazione non appena il componente è inizializzato
    setTimeout(() => {
      this.handAnimationState = 'end';
    }, 100); // Piccolo ritardo per assicurarsi che Angular abbia applicato lo stato 'start'
  }
}

