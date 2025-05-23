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
import { OpenDayComponent } from './open-day/open-day.component';
import { EducationalPathsData, EducationalPath } from '../../interfaces/educational-paths';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent,IndirizziComponent,ChiSiamoComponent, InfoComponent, EventiComponent, VideoComponent, ContattaciComponent, LogoNomeComponent, OpenDayComponent],
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
  // Scuole filtrate in base al tipo selezionato

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

  loadEducationalPaths(schoolId: string): void {
    this.directusService.getEduLinksForSchool(schoolId).subscribe({
      next: (response) => {
        if (response && response.data && response.data.edu_links && response.data.edu_links.length > 0) {
          // Estrai i dati dagli edu_links per il componente
          console.log("Edu links caricati:", response.data.edu_links);
        }
      },
      error: (error) => {
        console.error("Errore nel caricamento degli edu links:", error);
      }
    });
  }

}
