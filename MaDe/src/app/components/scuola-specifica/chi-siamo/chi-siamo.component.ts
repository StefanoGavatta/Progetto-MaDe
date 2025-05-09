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

  constructor(private scuolaService: ScuolaService) {}

  ngOnInit(): void {
    // Manteniamo la sottoscrizione per possibili usi futuri
    this.subscription = this.scuolaService.scuolaSelezionata$.subscribe(scuola => {
      // In futuro potremmo usare altri dati della scuola se necessario
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
