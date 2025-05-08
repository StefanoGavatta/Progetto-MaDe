import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() tipo: string = '';
  @Input() logo: string = '';
  
  uniqueId: string;
  
  constructor() {
    // Genera un ID univoco per ogni istanza della card
    this.uniqueId = Math.random().toString(36).substring(2, 11);
  }

  ngOnInit(): void {
  }
  
  goToDetails(){
    console.log("Cliccato su " + this.name)
    // Qui puoi implementare la logica per navigare alla pagina dei dettagli della scuola
    // Ad esempio, puoi usare il router di Angular per navigare a una nuova rotta
    // this.router.navigate(['/pagina-sito', { id: this.id }]);
  }
}
