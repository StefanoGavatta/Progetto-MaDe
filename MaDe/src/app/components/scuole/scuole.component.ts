import { Component, inject, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectusService } from '../../services/directus.service';
import { SchoolsData } from '../../interfaces/schools-data';
import { animate, state, style, transition, trigger, group, query } from '@angular/animations';

import { CardComponent } from './card/card.component';
import { FiltraComponent } from './filtra/filtra.component';
import { ScuolaDettagliata } from '../../interfaces/scuola-dettagliata';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-scuole',
  standalone: true,
  imports: [CommonModule, CardComponent, FiltraComponent,RouterLink,RouterLinkActive],
  templateUrl: './scuole.component.html',
  styleUrl: './scuole.component.css',
  animations: [
    trigger('handAnimationTrigger', [
      state('start', style({
        opacity: 1,
        pointerEvents: 'auto'
      })),
      state('end', style({
        opacity: 1,
        pointerEvents: 'none'
      })),
      transition('start => end', [
        group([
          query('.banner-image-left:not(.mobile-view)', [
            style({ transform: 'translateX(-30%) translateY(-50%)', opacity: 0 }),
            animate('2.5s ease-out', style({ transform: 'translateX(0%) translateY(-50%)', opacity: 1 }))
          ], { optional: true }),
          query('.banner-image-right:not(.mobile-view)', [
            style({ transform: 'translateX(30%) translateY(-50%)', opacity: 0 }),
            animate('2.5s ease-out', style({ transform: 'translateX(0%) translateY(-50%)', opacity: 1 }))
          ], { optional: true }),
          query('.banner-image.mobile-view', [
            style({ opacity: 0 }),
            animate('1.5s ease-out', style({ opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class ScuoleComponent implements OnInit {

  directusService = inject(DirectusService);
  scuoleDettagliate: WritableSignal<ScuolaDettagliata | null> = signal(null);
  filtroAttivo: WritableSignal<string | null> = signal(null);
  protected handAnimationState: 'start' | 'end' = 'start';
  protected isMobile = false;
  
  // Scuole filtrate in base al tipo selezionato
  scuoleFiltrate = computed(() => {
    const scuole = this.scuoleDettagliate()?.data || [];
    const filtro = this.filtroAttivo();
    
    if (!filtro) {
      return scuole; // Restituisci tutte le scuole se non c'è un filtro attivo
    }
    
    return scuole.filter(scuola => {
      const tipoScuola = this.getTipoScuola(scuola).toLowerCase();
      return tipoScuola.includes(filtro.toLowerCase());
    });
  });

  ngOnInit(): void {
    // Rileva se siamo su mobile
    this.isMobile = window.innerWidth <= 768;
    
    this.directusService.getMoreSchoolData().subscribe(dati => {
      this.scuoleDettagliate.set(dati);
      console.log("Dati dettagliati scuole:", this.scuoleDettagliate());
    });
    
    // Avvia l'animazione delle mani non appena il componente è inizializzato
    setTimeout(() => {
      this.handAnimationState = 'end';
    }, 200); // Piccolo ritardo per assicurarsi che Angular abbia applicato lo stato 'start'
  }

  applicaFiltro(filtro: string | null): void {
    this.filtroAttivo.set(filtro);
    console.log("Filtro applicato:", filtro);
  }

  getTipoScuola(scuola: any): string {
    if (scuola && scuola.type && scuola.type.name) {
      return scuola.type.name;
    }
    return 'Tipo non specificato';
  }
}

