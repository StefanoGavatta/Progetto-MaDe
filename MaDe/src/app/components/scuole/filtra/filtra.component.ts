import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtra.component.html',
  styleUrl: './filtra.component.css'
})
export class FiltraComponent {
  @Output() filtroSelezionato = new EventEmitter<string | null>();
  filtroAttivo: string | null = null;

  filtra(tipo: string): void {
    // Se clicchiamo sullo stesso filtro già attivo, lo disattiviamo
    if (this.filtroAttivo === tipo) {
      this.filtroAttivo = null;
    } else {
      this.filtroAttivo = tipo;
    }
    this.filtroSelezionato.emit(this.filtroAttivo);
  }

  isActive(tipo: string): boolean {
    return this.filtroAttivo === tipo;
  }
}
