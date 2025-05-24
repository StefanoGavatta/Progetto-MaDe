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
import { SchoolsData } from '../../interfaces/schools-data';
import { ActivatedRoute } from '@angular/router';
import { Scuola } from '../../interfaces/scuola';
import { IndirizziComponent } from './indirizzi/indirizzi.component';
import { EducationalPathsData, EducationalPath } from '../../interfaces/educational-paths';
import { switchMap } from 'rxjs/operators';
import { OpenDaysComponent } from './open-days/open-days.component';

@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent,IndirizziComponent,ChiSiamoComponent, InfoComponent, EventiComponent, VideoComponent, ContattaciComponent, LogoNomeComponent, OpenDaysComponent],
  templateUrl: './scuola-specifica.component.html',
  styleUrl: './scuola-specifica.component.css'
})
export class ScuolaSpecificaComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  directusService = inject(DirectusService);
  scuoleDettagliate: WritableSignal<Scuola | null> = signal(null);
  filtroAttivo: WritableSignal<string | null> = signal(null);
  educationalPaths: WritableSignal<EducationalPath[]> = signal([]);
  currentSchoolId: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametriNellaURL => {
      let id: string = parametriNellaURL['id'];
      this.currentSchoolId.set(id);
      
      // Carica i dati della scuola
      this.directusService.getSchoolData(id).subscribe(dati => {
        this.scuoleDettagliate.set(dati);
        console.log("Dati scuola caricati:", this.scuoleDettagliate());
        
        // Carica gli educational paths della scuola
        this.loadEducationalPaths(id);
      });
    });
  }

  // Metodo per ottenere l'ID del video in modo sicuro
  getVideoId(): string {
    const scuola = this.scuoleDettagliate();
    if (!scuola || !scuola.data || !scuola.data.videos) {
      return '';
    }
    
    // Accesso sicuro alla proprietà videos trattandola come any
    // per evitare problemi di tipo con la struttura dei dati
    const videos = scuola.data.videos as any;
    
    try {
      // Se è un array e contiene elementi
      if (Array.isArray(videos) && videos.length > 0) {
        // Controlla il primo elemento
        const firstItem = videos[0];
        if (typeof firstItem === 'string') {
          return firstItem; // Se è una stringa, è l'ID
        } else if (firstItem && typeof firstItem === 'object' && 'id' in firstItem) {
          return firstItem.id; // Se è un oggetto con proprietà id
        }
        
        // Controlla il secondo elemento se esiste
        if (videos.length > 1) {
          const secondItem = videos[1];
          if (typeof secondItem === 'string') {
            return secondItem;
          } else if (secondItem && typeof secondItem === 'object' && 'id' in secondItem) {
            return secondItem.id;
          }
        }
      }
    } catch (err) {
      console.error('Errore nell\'accesso ai dati del video:', err);
    }
    
    return '';
  }

  loadEducationalPaths(schoolId: string): void {
    this.directusService.getAllEducationalPaths().subscribe(
      paths => {
        if (paths && paths.data) {
          // Filtra i percorsi educativi per la scuola corrente
          const schoolPaths = paths.data.filter(path => {
            // Verifica se la proprietà school esiste ed è uguale all'ID della scuola
            return path.school === schoolId;
          });
          
          this.educationalPaths.set(schoolPaths);
          console.log("Percorsi educativi filtrati per scuola:", schoolPaths);
        }
      },
      error => console.error('Errore nel caricamento dei percorsi educativi:', error)
    );
  }
}
