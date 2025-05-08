import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  
  onCardClick(): void {
    this.cardClick.emit({
      id: this.id,
      name: this.name,
      tipo: this.tipo
    });
  }
}
