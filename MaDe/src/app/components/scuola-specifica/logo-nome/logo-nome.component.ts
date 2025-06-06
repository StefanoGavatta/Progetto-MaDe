import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../../../services/scuola.service';
import { DirectusService } from '../../../services/directus.service';
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
  @Input() websiteUrl: string = '';
  @Input() address: string = '';
  @Input() responsabileOrientamento: string = '';
  @Input() schoolId: string = '';

  // Proprietà per l'email caricata dall'endpoint
  schoolEmail: string = '';
  isLoadingEmail: boolean = false;
  emailError: string = '';

  // Proprietà per il telefono caricato dall'endpoint
  schoolPhone: string = '';
  isLoadingPhone: boolean = false;
  phoneError: string = '';

  private subscription: Subscription | undefined;
  private directusService = inject(DirectusService);

  constructor(private scuolaService: ScuolaService) {}

  ngOnInit(): void {
    this.subscription = this.scuolaService.scuolaSelezionata$.subscribe(scuola => {
      this.nome = scuola.name;
      this.logo = scuola.logo;
      this.description = scuola.description || '';
      this.websiteUrl = scuola.website_url || '';
      this.address = scuola.address || '';
      this.responsabileOrientamento = scuola.responsabile_orientamento || '';
      
      // Se abbiamo l'ID della scuola, carica l'email e il telefono dall'endpoint
      if (scuola.id || this.schoolId) {
        this.loadSchoolEmail(scuola.id || this.schoolId);
        this.loadSchoolPhone(scuola.id || this.schoolId);
      }
    });

    // Se abbiamo già l'schoolId e non ci sono dati dal servizio, carica l'email e il telefono
    if (this.schoolId && !this.schoolEmail) {
      this.loadSchoolEmail(this.schoolId);
    }
    if (this.schoolId && !this.schoolPhone) {
      this.loadSchoolPhone(this.schoolId);
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
        console.log('Risposta email dalla API:', response);
        
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
        console.error('Errore nel caricamento dell\'email della scuola:', error);
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
        console.log('Risposta telefono dalla API:', response);
        
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
        console.error('Errore nel caricamento del telefono della scuola:', error);
        this.phoneError = 'Errore nel caricamento del telefono';
        this.isLoadingPhone = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
