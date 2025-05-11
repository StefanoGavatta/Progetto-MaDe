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
@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent,IndirizziComponent,ChiSiamoComponent, InfoComponent, EventiComponent, VideoComponent, ContattaciComponent, LogoNomeComponent],
  templateUrl: './scuola-specifica.component.html',
  styleUrl: './scuola-specifica.component.css'
})
export class ScuolaSpecificaComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  directusService = inject(DirectusService);
  scuoleDettagliate: WritableSignal<Scuola | null> = signal(null);
  filtroAttivo: WritableSignal<string | null> = signal(null);
  // Scuole filtrate in base al tipo selezionato

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametriNellaURL =>{
    let id: string = parametriNellaURL['id']
    this.directusService.getSchoolData(id).subscribe(dati => {
        this.scuoleDettagliate.set(dati)
        
        console.log(this.scuoleDettagliate())
        console.log("aaaaa")
    });
    })
  }

}
