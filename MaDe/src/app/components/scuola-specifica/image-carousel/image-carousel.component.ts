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
    'https://placehold.co/1200x800?text=Immagine+1',  // Immagini più grandi per il display a schermo intero
    'https://placehold.co/1200x800?text=Immagine+2',
    'https://placehold.co/1200x800?text=Immagine+3',
    'https://placehold.co/1200x800?text=Immagine+4',
    'https://placehold.co/1200x800?text=Immagine+5',
    'https://placehold.co/1200x800?text=Immagine+6'
  ];

  // Indice iniziale (prima immagine visibile)
  startIndex = 0;
  
  // Numero di immagini visibili contemporaneamente
  visibleImages = 4; // valore predefinito per schermi grandi

  // Traccia lo stato dell'animazione
  animationActive = true;
  previousStartIndex = 0;

  // Flag per controllare se è il caricamento iniziale
  isInitialLoad = true;

  ngOnInit() {
    this.updateVisibleImages();
    // Aggiungiamo un listener iniziale per assicurarsi che il carousel si adatti subito alla dimensione dello schermo
    window.dispatchEvent(new Event('resize'));
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
    } else if (width <= 1200) {  // Aumentato il breakpoint per schermi più grandi
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
    this.previousStartIndex = this.startIndex;
    if (this.startIndex > 0) {
      this.startIndex--;
    } else {
      // Se siamo all'inizio, andiamo all'ultimo gruppo possibile di immagini
      const maxIndex = this.images.length - this.visibleImages;
      this.startIndex = maxIndex > 0 ? maxIndex : 0;
    }
    this.triggerAnimation();
    // Assicuriamoci che l'animazione non venga riapplicata
    this.isInitialLoad = false;
  }

  // Vai all'immagine successiva (con ciclo)
  nextImage(): void {
    this.previousStartIndex = this.startIndex;
    const maxIndex = this.images.length - this.visibleImages;
    if (this.startIndex < maxIndex) {
      this.startIndex++;
    } else {
      // Se siamo alla fine, torniamo all'inizio
      this.startIndex = 0;
    }
    this.triggerAnimation();
    // Assicuriamoci che l'animazione non venga riapplicata
    this.isInitialLoad = false;
  }

  // Attiva l'animazione quando cambia la visualizzazione
  triggerAnimation(): void {
    this.animationActive = false;
    setTimeout(() => {
      this.animationActive = true;
    }, 50);
  }

  // Verifica se applicare l'animazione a un'immagine specifica in base al suo indice
  shouldAnimate(index: number): boolean {
    // Verifica se l'immagine è visibile e l'animazione è attiva
    return this.animationActive && 
           index >= this.startIndex && 
           index < this.startIndex + this.visibleImages;
  }

  get canGoNext(): boolean {
    return this.images.length > this.visibleImages;
  }
}
