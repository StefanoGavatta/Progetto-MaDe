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
  // Array di 6 immagini placeholder
  images: string[] = [
    'https://placehold.co/300x200?text=Immagine+1',
    'https://placehold.co/300x200?text=Immagine+2',
    'https://placehold.co/300x200?text=Immagine+3',
    'https://placehold.co/300x200?text=Immagine+4',
    'https://placehold.co/300x200?text=Immagine+5',
    'https://placehold.co/300x200?text=Immagine+6'
  ];

  // Indice dell'immagine corrente (la prima del gruppo visibile)
  currentIndex = 0;

  // Numero di immagini visibili contemporaneamente
  visibleImages = 4;

  // Metodo per andare all'immagine precedente
  prevImage(): void {
    // Sottrae 1 e, se negativo, torna all'indice massimo possibile
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Metodo per andare all'immagine successiva
  nextImage(): void {
    // Avanza di uno con gestione circolare
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Metodo per ottenere le immagini attualmente visibili con avvolgimento circolare
  get visibleImagesList(): string[] {
    const result: string[] = [];
    
    // Aggiungiamo le immagini visibili con gestione circolare
    for (let i = 0; i < this.visibleImages; i++) {
      const index = (this.currentIndex + i) % this.images.length;
      result.push(this.images[index]);
    }
    
    return result;
  }
}
