import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectusService } from '../../../services/directus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scuola-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './scuola-footer.component.html',
  styleUrl: './scuola-footer.component.css'
})
export class ScuolaFooterComponent implements OnInit, OnDestroy {
  @Input() schoolId: string = '';

  // Proprietà per l'email caricata dall'endpoint
  schoolEmail: string = '';
  isLoadingEmail: boolean = false;
  emailError: string = '';

  // Proprietà per il telefono caricato dall'endpoint
  schoolPhone: string = '';
  isLoadingPhone: boolean = false;
  phoneError: string = '';

  // Proprietà per indirizzo e responsabile orientamento
  schoolAddress: string = '';
  responsabileOrientamento: string = '';
  isLoadingSchoolData: boolean = false;
  schoolDataError: string = '';

  private directusService = inject(DirectusService);

  ngOnInit(): void {
    // Se abbiamo l'ID della scuola, carica l'email e il telefono dall'endpoint
    if (this.schoolId) {
      this.loadSchoolEmail(this.schoolId);
      this.loadSchoolPhone(this.schoolId);
      this.loadSchoolData(this.schoolId);
    }
  }

  /**
   * Carica l'email della scuola dall'endpoint /items/school_emails
   * @param schoolId ID della scuola
   */
  private loadSchoolEmail(schoolId: string): void {
    if (!schoolId) {
      console.warn('ID scuola non fornito per il caricamento dell\'email');
      return;
    }

    this.isLoadingEmail = true;
    this.emailError = '';

    this.directusService.getSchoolEmails(schoolId).subscribe({
      next: (response) => {
        console.log('Risposta email dalla API (footer):', response);
        
        if (response && response.data && response.data.length > 0) {
          // Prendi la prima email disponibile (o quella con sort minore)
          const firstEmail = response.data[0];
          this.schoolEmail = firstEmail.email || '';
        } else {
          console.log('Nessuna email trovata per la scuola ID:', schoolId);
          this.schoolEmail = '';
        }
        
        this.isLoadingEmail = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento dell\'email della scuola (footer):', error);
        this.emailError = 'Errore nel caricamento dell\'email';
        this.isLoadingEmail = false;
      }
    });
  }

  /**
   * Carica il numero di telefono della scuola dall'endpoint /items/school_phones
   * @param schoolId ID della scuola
   */
  private loadSchoolPhone(schoolId: string): void {
    if (!schoolId) {
      console.warn('ID scuola non fornito per il caricamento del telefono');
      return;
    }

    this.isLoadingPhone = true;
    this.phoneError = '';

    this.directusService.getSchoolPhones(schoolId).subscribe({
      next: (response) => {
        console.log('Risposta telefono dalla API (footer):', response);
        
        if (response && response.data && response.data.length > 0) {
          // Prendi il primo numero di telefono disponibile (o quello con sort minore)
          const firstPhone = response.data[0];
          this.schoolPhone = firstPhone.number || '';
        } else {
          console.log('Nessun telefono trovato per la scuola ID:', schoolId);
          this.schoolPhone = '';
        }
        
        this.isLoadingPhone = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento del telefono della scuola (footer):', error);
        this.phoneError = 'Errore nel caricamento del telefono';
        this.isLoadingPhone = false;
      }
    });
  }

  /**
   * Carica i dati della scuola per ottenere indirizzo e responsabile orientamento
   * @param schoolId ID della scuola
   */
  private loadSchoolData(schoolId: string): void {
    if (!schoolId) {
      console.warn('ID scuola non fornito per il caricamento dei dati');
      return;
    }

    this.isLoadingSchoolData = true;
    this.schoolDataError = '';

    this.directusService.getSchoolData(schoolId).subscribe({
      next: (response) => {
        console.log('Risposta dati scuola dalla API (footer):', response);
        
        if (response && response.data) {
          this.schoolAddress = response.data.address || '';
          this.responsabileOrientamento = response.data.responsabile_orientamento || '';
        } else {
          console.log('Nessun dato trovato per la scuola ID:', schoolId);
          this.schoolAddress = '';
          this.responsabileOrientamento = '';
        }
        
        this.isLoadingSchoolData = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento dei dati della scuola (footer):', error);
        this.schoolDataError = 'Errore nel caricamento dei dati';
        this.isLoadingSchoolData = false;
      }
    });
  }

  ngOnDestroy(): void {
    // Se ci fossero sottoscrizioni da pulire, le puliremmo qui
  }
}
