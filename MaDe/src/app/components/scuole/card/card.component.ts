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
  
  getCardColor(): string {
    // Determina la colonna in base all'indice
    // (indice % 3) dà 0 per prima colonna, 1 per seconda, 2 per terza
    const colonna = this.index % 3;
    
    switch(colonna) {
      case 0: return '#1C7C54'; // Prima colonna - verde scuro (come richiesto)
      case 1: return '#FFC84D'; // Seconda colonna - giallo/ambra (come richiesto)
      case 2: return '#F993AE'; // Terza colonna - rosa (come richiesto)
      default: return '#FFFFFF'; // Bianco come fallback
    }
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
      tipo: this.tipo
    };
    
    // Invia i dati attraverso il servizio
    this.scuolaService.setScuolaSelezionata(scuola);
    
    // Mantiene anche l'EventEmitter per compatibilità
    this.cardClick.emit(scuola);
  }
}
