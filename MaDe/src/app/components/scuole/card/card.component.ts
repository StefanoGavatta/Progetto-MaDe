import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../../../services/scuola.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() logo: string = '';
  @Input() tipo: string = '';
  @Input() id: number | string = '';
  @Input() index: number = 0;
  
  @Output() cardClick = new EventEmitter<any>();
  
  constructor(private scuolaService: ScuolaService) {}
  
  // Input per identificare se questa è l'ultima carta
  @Input() isLastCard: boolean = false;
  
  getCardColor(): string {
    // Colori disponibili
    const blu = '#083D77';
    const giallo = '#FFC84D';
    const rosa = '#F993AE';
    
    // Se è l'ultima carta, ritorna sempre blu
    if (this.isLastCard) {
      return blu;
    }
    
    // Determina la riga e la colonna in base all'indice
    const riga = Math.floor(this.index / 3); // 0 per prima riga, 1 per seconda, ecc.
    const colonna = this.index % 3;          // 0 per prima colonna, 1 per seconda, 2 per terza
    
    // Pattern di colori alternati per riga
    if (riga % 3 === 0) {
      // Prima riga: Blu, Giallo, Rosa
      switch(colonna) {
        case 0: return blu;
        case 1: return giallo;
        case 2: return rosa;
      }
    } else if (riga % 3 === 1) {
      // Seconda riga: Rosa, Blu, Giallo
      switch(colonna) {
        case 0: return rosa;
        case 1: return blu;
        case 2: return giallo;
      }
    } else {
      // Terza riga: Giallo, Rosa, Blu
      switch(colonna) {
        case 0: return giallo;
        case 1: return rosa;
        case 2: return blu;
      }
    }
    
    return '#FFFFFF'; // Bianco come fallback
  }
  
  getTextColor(): string {
    // Imposta il testo bianco solo per le carte blu, nero per giallo e rosa
    const cardColor = this.getCardColor();
    return cardColor === '#083D77' ? '#FFFFFF' : '#000000';
  }
  
  getAnimationDelay(): string {
    // Aggiunge un ritardo di 0.1s * indice per creare un effetto a cascata
    return `${this.index * 0.1}s`;
  }
  
  onCardClick(): void {
    const scuola = {
      id: this.id,
      name: this.name,
      logo: this.logo,
      tipo: this.tipo,
      description: this.description
    };
    
    // Invia i dati attraverso il servizio
    this.scuolaService.setScuolaSelezionata(scuola);
    
    // Mantiene anche l'EventEmitter per compatibilità
    this.cardClick.emit(scuola);
  }
}
