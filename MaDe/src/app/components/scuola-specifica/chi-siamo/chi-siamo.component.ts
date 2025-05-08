import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';  // Aggiungi questa importazione
import { ScuolaService } from '../../../services/scuola.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.css'],
  standalone: true,  // Se il componente è standalone
  imports: [CommonModule]  // Aggiungi CommonModule agli imports
})
export class ChiSiamoComponent implements OnInit, OnDestroy {
  nome: string = '';
  logo: string = '';
  private subscription: Subscription | undefined;

  constructor(private scuolaService: ScuolaService) {}

  ngOnInit(): void {
    this.subscription = this.scuolaService.scuolaSelezionata$.subscribe(scuola => {
      this.nome = scuola.name;
      this.logo = scuola.logo;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
