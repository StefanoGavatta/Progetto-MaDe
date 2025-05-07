import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectusService } from '../../services/directus.service';
import { SchoolsData } from '../../interfaces/schools-data';
import { CardComponent } from './card/card.component';


@Component({
  selector: 'app-scuole',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './scuole.component.html',
  styleUrl: './scuole.component.css'
})
export class ScuoleComponent implements OnInit{

  directusService = inject(DirectusService);
  scuolaData: WritableSignal<SchoolsData | null> = signal(null);

  ngOnInit(): void {
      this.directusService.getSchoolsData().subscribe(dati => {
          this.scuolaData.set(dati);
          console.log(this.scuolaData());

          this.directusService.getMoreSchoolData().subscribe(dati => {
            this.scuolaData.set(dati);
            console.log(this.scuolaData());
          });
      });
  }
}
  
