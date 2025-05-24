import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css'
})
export class ImageCarouselComponent implements OnInit, OnChanges {
  @Input() schoolId: string = '';
  @Input() schoolName: string = '';
  
  // Array di 6 immagini (placeholder predefiniti)
  images: string[] = [
    'https://placehold.co/1200x800?text=Immagine+1',  // Immagini più grandi per il display a schermo intero
    'https://placehold.co/1200x800?text=Immagine+2',
    'https://placehold.co/1200x800?text=Immagine+3',
    'https://placehold.co/1200x800?text=Immagine+4',
    'https://placehold.co/1200x800?text=Immagine+5',
    'https://placehold.co/1200x800?text=Immagine+6'
  ];
  
  // Proprietà per il modal/lightbox
  modalVisible: boolean = false;
  selectedImageIndex: number = -1;
  isImageLoading: boolean = true; // Flag per indicare se l'immagine è in caricamento
  
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['schoolId'] || changes['schoolName']) && this.schoolName) {
      this.updateImagesBasedOnSchool();
    }
  }

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
    this.updateImagesBasedOnSchool();
    // Aggiungiamo un listener iniziale per assicurarsi che il carousel si adatti subito alla dimensione dello schermo
    window.dispatchEvent(new Event('resize'));
  }
  
  // Metodo per aprire il modal con l'immagine ingrandita
  openModal(index: number): void {
    this.selectedImageIndex = index;
    this.modalVisible = true;
    this.isImageLoading = true; // Attiva l'indicatore di caricamento
    
    // Aggiungiamo una classe al body per prevenire lo scrolling quando il modal è aperto
    document.body.classList.add('no-scroll');
    
    // Precarica l'immagine per garantire la dimensione corretta
    const preloadImg = new Image();
    preloadImg.src = this.images[index];
    
    // Quando l'immagine è caricata, disattiva l'indicatore di caricamento
    preloadImg.onload = () => {
      if (this.modalVisible) {
        this.isImageLoading = false;
      }
    };
    
    preloadImg.onerror = () => {
      this.isImageLoading = false;
      console.error(`Errore nel caricare l'immagine: ${this.images[index]}`);
    };
  }
  
  // Metodo per chiudere il modal
  closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.modalVisible = false;
    document.body.classList.remove('no-scroll');
  }
  
  // Funzioni per navigare tra le immagini nel modal
  
  nextModalImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    // Attiva l'indicatore di caricamento
    this.isImageLoading = true;
    
    if (this.selectedImageIndex < this.images.length - 1) {
      this.selectedImageIndex++;
    } else {
      this.selectedImageIndex = 0; // Torna al primo
    }
    
    // Precarica la nuova immagine
    const preloadImg = new Image();
    preloadImg.src = this.images[this.selectedImageIndex];
    preloadImg.onload = () => {
      if (this.modalVisible) {
        this.isImageLoading = false;
      }
    };
  }
  
  prevModalImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    // Attiva l'indicatore di caricamento
    this.isImageLoading = true;
    
    // Attiva l'indicatore di caricamento
    this.isImageLoading = true;
    
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    } else {
      this.selectedImageIndex = this.images.length - 1; // Vai all'ultimo
    }
    
    // Precarica la nuova immagine
    const preloadImg = new Image();
    preloadImg.src = this.images[this.selectedImageIndex];
    preloadImg.onload = () => {
      if (this.modalVisible) {
        this.isImageLoading = false;
      }
    };
  }
  
  updateImagesBasedOnSchool(): void {
    console.log('Aggiornamento immagini basato sulla scuola:', this.schoolName);
    
    // Verifica se la scuola è Istituto Tecnico Tecnologico 'G. Marconi'
    if (this.schoolName && (
        this.schoolName.includes('Marconi') || 
        this.schoolName.includes("Istituto Tecnico Tecnologico 'G. Marconi'") ||
        this.schoolName === "Istituto Tecnico Tecnologico 'G. Marconi'"
      )) {
      console.log('Trovata scuola Marconi, caricamento immagini specifiche.');
      // Caricamento delle immagini dalla cartella marconi
      const marconiImages = [
        '/marconi/download.jpeg',
        '/marconi/download (1).jpeg',
        '/marconi/download (2).jpeg',
        '/marconi/download (3).jpeg',
        '/marconi/download (4).jpeg',
        '/marconi/download (5).jpeg'
      ];
      
      // Precarica le immagini per assicurarsi che vengano caricate correttamente
      this.preloadImages(marconiImages);
      
      // Imposta le immagini
      this.images = marconiImages;
    } else {
      // Ripristino dei placeholder per le altre scuole
      this.images = [
        'https://placehold.co/1200x800?text=Immagine+1',
        'https://placehold.co/1200x800?text=Immagine+2',
        'https://placehold.co/1200x800?text=Immagine+3',
        'https://placehold.co/1200x800?text=Immagine+4',
        'https://placehold.co/1200x800?text=Immagine+5',
        'https://placehold.co/1200x800?text=Immagine+6'
      ];
    }
  }
  
  // Metodo per precaricare le immagini
  preloadImages(imageUrls: string[]): void {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        console.log(`Immagine precaricata: ${url}, dimensioni: ${img.width}x${img.height}`);
      };
      img.onerror = () => {
        console.error(`Errore nel caricare l'immagine: ${url}`);
      };
    });
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
  


    // Gestione degli eventi da tastiera quando il modal è aperto
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.modalVisible) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        this.prevModalImage();
        break;
      case 'ArrowRight':
        this.nextModalImage();
        break;
      case 'Escape':
        this.closeModal();
        break;
      default:
        break;
    }
  }
}
