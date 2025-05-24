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
        // Stato iniziale dell'overlay
        opacity: 1, // Completamente visibile
        backgroundColor: 'white', // Sfondo bianco per coprire tutto
        pointerEvents: 'auto' // Permette di catturare gli eventi mouse (se necessario, ma lo faremo 'none' alla fine)
      })),
      state('end', style({
        // Stato finale dell'overlay
        opacity: 0, // Completamente trasparente
        pointerEvents: 'none' // Disabilita gli eventi mouse sull'overlay finito
      })),
      transition('start => end', [
        group([
          // Animazione per la mano sinistra
          query('.mano-sinistra', [
            style({ left: '-250px', opacity: 0 }), // Stile iniziale: fuori schermo a sinistra, invisibile
            animate('1.5s ease-out', style({ left: '20%', opacity: 1 })) // Arriva vicino alla mappa (regola 150px)
          ], { optional: true }),
          // Animazione per la mano destra
          query('.mano-destra', [
            style({ right: '-250px', opacity: 0 }), // Stile iniziale: fuori schermo a destra, invisibile
            animate('1.5s ease-out', style({ right: '20%', opacity: 1 })) // Arriva vicino alla mappa (regola 150px)
          ], { optional: true }),
          // Animazione per la mappa centrale (se vuoi un fade-in o zoom-in)
          // Animazione dell'overlay stesso (lo sfondo diventa trasparente)
          // Questa animazione dovrebbe durare quanto le mani o poco più, per farla svanire
          // e rivelare il contenuto sottostante.
          animate('1.8s ease-out', style({
            opacity: 0, // Rendi l'overlay trasparente
            backgroundColor: 'transparent' // Sfondo trasparente
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

