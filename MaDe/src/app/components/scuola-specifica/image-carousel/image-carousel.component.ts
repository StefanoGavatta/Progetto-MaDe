import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css'
})
export class ImageCarouselComponent {
  // Array di 6 immagini
  images: string[] = [
    'https://placehold.co/300x200?text=Immagine+1',
    'https://placehold.co/300x200?text=Immagine+2',
    'https://placehold.co/300x200?text=Immagine+3',
    'https://placehold.co/300x200?text=Immagine+4',
    'https://placehold.co/300x200?text=Immagine+5',
    'https://placehold.co/300x200?text=Immagine+6'
  ];

  // Indice iniziale (prima immagine visibile)
  startIndex = 0;
  
  // Numero di immagini visibili contemporaneamente
  readonly visibleImages = 4;

  // Proprietà per l'animazione di scorrimento
  get slideTransform(): string {
    // Calcoliamo la percentuale di spostamento in base all'indice di partenza
    // Ogni immagine occupa il 25% della larghezza (perché mostriamo 4 immagini alla volta)
    return `translateX(-${this.startIndex * 25}%)`;
  }

  // Vai all'immagine precedente (con ciclo)
  prevImage(): void {
    if (this.startIndex > 0) {
      this.startIndex--;
    } else {
      // Se siamo all'inizio, andiamo all'ultimo gruppo possibile di immagini
      this.startIndex = this.images.length - this.visibleImages;
    }
  }

  // Vai all'immagine successiva (con ciclo)
  nextImage(): void {
    if (this.startIndex < this.images.length - this.visibleImages) {
      this.startIndex++;
    } else {
      // Se siamo alla fine, torniamo all'inizio
      this.startIndex = 0;
    }
  }
}
