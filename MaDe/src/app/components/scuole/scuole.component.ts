import { Component, inject, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectusService } from '../../services/directus.service';
import { SchoolsData } from '../../interfaces/schools-data';
import { CardComponent } from './card/card.component';

import { CardComponent } from './card/card.component';
import { FiltraComponent } from './filtra/filtra.component';
import { ScuolaDettagliata } from '../../interfaces/scuola-dettagliata';


@Component({
  selector: 'app-scuole',
  standalone: true,
  imports: [CommonModule, CardComponent, FiltraComponent],
  templateUrl: './scuole.component.html',
  styleUrl: './scuole.component.css'
})
export class ScuoleComponent implements OnInit {

  directusService = inject(DirectusService);
  scuoleDettagliate: WritableSignal<ScuolaDettagliata | null> = signal(null);
  filtroAttivo: WritableSignal<string | null> = signal(null);
  
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
    this.directusService.getMoreSchoolData().subscribe(dati => {
      this.scuoleDettagliate.set(dati);
      console.log("Dati dettagliati scuole:", this.scuoleDettagliate());
    });
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

