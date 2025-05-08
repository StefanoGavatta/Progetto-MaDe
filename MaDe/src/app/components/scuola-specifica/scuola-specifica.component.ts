import { Component } from '@angular/core';

import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { InfoComponent } from './info/info.component';
import { EventiComponent } from './eventi/eventi.component';
import { VideoComponent } from './video/video.component';
import { ContattaciComponent } from './contattaci/contattaci.component';

@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent,ChiSiamoComponent, InfoComponent, EventiComponent, VideoComponent, ContattaciComponent],
  templateUrl: './scuola-specifica.component.html',
  styleUrl: './scuola-specifica.component.css'
})
export class ScuolaSpecificaComponent {
  
}
