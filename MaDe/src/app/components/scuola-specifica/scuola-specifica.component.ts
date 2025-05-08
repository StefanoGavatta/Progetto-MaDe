import { Component } from '@angular/core';

import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

@Component({
  selector: 'app-scuola-specifica',
  imports: [ImageCarouselComponent],
  templateUrl: './scuola-specifica.component.html',
  styleUrl: './scuola-specifica.component.css'
})
export class ScuolaSpecificaComponent {
  scuola = {
    nome: 'Nome Scuola',
    immagineUrl: 'assets/images/sss.png'
    // altre proprietà...
  };
}
