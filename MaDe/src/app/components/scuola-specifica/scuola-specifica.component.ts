import { Component } from '@angular/core';

import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { InfoComponent } from './info/info.component';
import { EventiComponent } from './eventi/eventi.component';

@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent,ChiSiamoComponent, InfoComponent, EventiComponent],
  templateUrl: './scuola-specifica.component.html',
  styleUrl: './scuola-specifica.component.css'
})
export class ScuolaSpecificaComponent {
  scuola = {

  };
}
