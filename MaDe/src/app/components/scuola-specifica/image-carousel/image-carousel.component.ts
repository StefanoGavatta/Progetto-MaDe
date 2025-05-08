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

  // Controlla se il pulsante "prev" dovrebbe essere disabilitato
  get canGoBack(): boolean {
    return this.startIndex > 0;
  }

  // Controlla se il pulsante "next" dovrebbe essere disabilitato
  get canGoForward(): boolean {
    return this.startIndex < this.images.length - this.visibleImages;
  }

  // Le immagini attualmente visibili nel carosello
  get visibleSlides(): string[] {
    return this.images.slice(this.startIndex, this.startIndex + this.visibleImages);
  }

  // Vai all'immagine precedente
  prevImage(): void {
    if (this.canGoBack) {
      this.startIndex--;
    }
  }

  // Vai all'immagine successiva
  nextImage(): void {
    if (this.canGoForward) {
      this.startIndex++;
    }
  }
}
