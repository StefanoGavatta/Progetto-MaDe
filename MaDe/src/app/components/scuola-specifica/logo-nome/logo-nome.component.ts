import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../../../services/scuola.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logo-nome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-nome.component.html',
  styleUrl: './logo-nome.component.css'
})
export class LogoNomeComponent implements OnInit, OnDestroy {
  @Input() nome: string = '';
  @Input() logo: string = '';
  @Input() description: string = '';
  private subscription: Subscription | undefined;

  constructor(private scuolaService: ScuolaService) {}

  ngOnInit(): void {
    this.subscription = this.scuolaService.scuolaSelezionata$.subscribe(scuola => {
      this.nome = scuola.name;
      this.logo = scuola.logo;
      this.description = scuola.description || '';
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
