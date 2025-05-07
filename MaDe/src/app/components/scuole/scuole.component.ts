
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DirectusService } from '../../services/directus.service';
import { SchoolsData } from '../../interfaces/schools-data';

@Component({
  selector: 'app-scuole',
  imports: [CardComponent],
  templateUrl: './scuole.component.html',
  styleUrl: './scuole.component.css'
})
export class ScuoleComponent implements OnInit{

  directusService = inject(DirectusService);
  scuolaData: WritableSignal<SchoolsData | null> = signal(null);

  ngOnInit(): void {
      this.directusService.getSchoolsData().subscribe(dati => {
          this.scuolaData.set(dati)
          console.log(this.scuolaData())
          console.log("aaaaa")
      });
  }

