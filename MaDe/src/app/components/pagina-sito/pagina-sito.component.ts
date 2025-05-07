import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DirectusService } from '../../services/directus.service';
import { SchoolsData } from '../../interfaces/schools-data';
import { ActivatedRoute } from '@angular/router';
import { Scuola } from '../../interfaces/scuola';

@Component({
  selector: 'app-pagina-sito',
  imports: [],
  templateUrl: './pagina-sito.component.html',
  styleUrl: './pagina-sito.component.css'
})
export class PaginaSitoComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  imageUrl: string = ""
  videoUrl: string = ""
  directusService = inject(DirectusService);
  scuolaData: WritableSignal<Scuola | null> = signal(null);
  loading = true;
  error: string | null = null;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametriNellaURL =>{
    let id: string = parametriNellaURL['id']
    this.directusService.getSchoolData(id).subscribe(dati => {
        this.scuolaData.set(dati)
        this.imageUrl = `https://api.retescuolevallagarina.it/assets/${dati?.data.logo ?? "bho"}`
        this.videoUrl = `https://api.retescuolevallagarina.it/assets/${dati?.data.videos[0] ?? "bho"}`
      console.log( `https://api.retescuolevallagarina.it/assets/${dati?.data.videos[0] ?? "bho"}`)
        
        console.log(this.scuolaData())
        console.log("aaaaa")
    });
    })

  }





  

}
