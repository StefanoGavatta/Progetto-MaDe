import { Component, Directive, inject } from '@angular/core';

import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { InfoComponent } from './info/info.component';
import { EventiComponent } from './eventi/eventi.component';
import { VideoComponent } from './video/video.component';
import { ContattaciComponent } from './contattaci/contattaci.component';
import { DirectusService } from '../../services/directus.service';
import { OnInit, signal, WritableSignal, computed } from '@angular/core';
import { ScuolaDettagliata } from '../../interfaces/scuola-dettagliata';
import { LogoNomeComponent } from './logo-nome/logo-nome.component';
@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent,ChiSiamoComponent, InfoComponent, EventiComponent, VideoComponent, ContattaciComponent, LogoNomeComponent],
  templateUrl: './scuola-specifica.component.html',
  styleUrl: './scuola-specifica.component.css'
})
export class ScuolaSpecificaComponent {
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
