import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectusService } from '../../services/directus.service';
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
export class ScuoleComponent implements OnInit{

  directusService = inject(DirectusService);
  scuoleDettagliate: WritableSignal<ScuolaDettagliata | null> = signal(null);

  ngOnInit(): void {
    this.directusService.getMoreSchoolData().subscribe(dati => {
      this.scuoleDettagliate.set(dati);
      console.log("Dati dettagliati scuole:", this.scuoleDettagliate());
    });
  }

  getTipoScuola(scuola: any): string {
    if (scuola && scuola.type && scuola.type.name) {
      return scuola.type.name;
    }
    return 'Tipo non specificato';
  }
}

