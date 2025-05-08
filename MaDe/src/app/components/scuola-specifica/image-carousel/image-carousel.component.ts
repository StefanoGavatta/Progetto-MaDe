import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css'
})
export class ImageCarouselComponent implements OnInit {
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
  visibleImages = 4; // valore predefinito per schermi grandi

  ngOnInit() {
    this.updateVisibleImages();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleImages();
    // Assicura che startIndex sia valido dopo il ridimensionamento
    this.startIndex = Math.min(this.startIndex, this.images.length - this.visibleImages);
    if (this.startIndex < 0) this.startIndex = 0;
  }

  updateVisibleImages() {
    const width = window.innerWidth;
    if (width <= 480) {
      this.visibleImages = 1;
    } else if (width <= 768) {
      this.visibleImages = 2;
    } else if (width <= 992) {
      this.visibleImages = 3;
    } else {
      this.visibleImages = 4;
    }
  }

  get slideWidth(): number {
    return 100 / this.visibleImages;
  }
  
  // Proprietà per l'animazione di scorrimento
  get slideTransform(): string {
    // Calcoliamo la percentuale di spostamento in base all'indice di partenza
    // Ogni immagine occupa il 25% della larghezza (perché mostriamo 4 immagini alla volta)
    return `translateX(-${this.startIndex * this.slideWidth}%)`;
  }

  // Vai all'immagine precedente (con ciclo)
  prevImage(): void {
    if (this.startIndex > 0) {
      this.startIndex--;
    } else {
      // Se siamo all'inizio, andiamo all'ultimo gruppo possibile di immagini
      const maxIndex = this.images.length - this.visibleImages;
      this.startIndex = maxIndex > 0 ? maxIndex : 0;
    }
  }

  // Vai all'immagine successiva (con ciclo)
  nextImage(): void {
    const maxIndex = this.images.length - this.visibleImages;
    if (this.startIndex < maxIndex) {
      this.startIndex++;
    } else {
      // Se siamo alla fine, torniamo all'inizio
      this.startIndex = 0;
    }
  }

  get canGoNext(): boolean {
    return this.images.length > this.visibleImages;
  }
}
