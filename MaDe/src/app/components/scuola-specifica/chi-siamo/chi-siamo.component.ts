import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../../../services/scuola.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ChiSiamoComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  // Proprietà per le card
  leftCardTitle: string = 'La Nostra Missione';
  leftCardDescription: string = 'La nostra missione è fornire un\'istruzione di qualità che prepari gli studenti ad affrontare le sfide del futuro.';
  
  rightCardTitle: string = 'I Nostri Valori';
  rightCardDescription: string = 'Ci impegniamo a promuovere l\'eccellenza, l\'innovazione e la responsabilità in ogni aspetto del nostro lavoro.';

  constructor(private scuolaService: ScuolaService) {}

  ngOnInit(): void {
    this.subscription = this.scuolaService.scuolaSelezionata$.subscribe(scuola => {
      // In futuro potremmo usare i dati della scuola per personalizzare le card
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
