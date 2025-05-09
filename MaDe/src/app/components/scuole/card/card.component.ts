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
  
  @Output() cardClick = new EventEmitter<any>();
  
  constructor(private scuolaService: ScuolaService) {}
  
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
