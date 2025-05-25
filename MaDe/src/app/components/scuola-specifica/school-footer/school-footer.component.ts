import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectusService } from '../../../services/directus.service';
import { Scuola, SchoolPhones, SchoolEmails } from '../../../interfaces/scuola';

// Interfacce locali per i dati elaborati
interface SchoolPhone {
  id?: string;
  phone: string;
  description?: string;
  label?: string;
  number?: string;
}

interface SchoolEmail {
  id?: string;
  email: string;
  description?: string;
  label?: string;
}

@Component({
  selector: 'app-school-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './school-footer.component.html',
  styleUrls: ['./school-footer.component.css']
})
export class SchoolFooterComponent implements OnInit {
  @Input() schoolId: string = '';
  @Input() schoolData: Scuola | null = null;
  
  phones: SchoolPhone[] = [];
  emails: SchoolEmail[] = [];
  isLoading = true;
  error: string | null = null;

  private directusService: DirectusService = inject(DirectusService);

  ngOnInit(): void {
    console.log('SchoolFooterComponent init - SchoolId:', this.schoolId);
    console.log('SchoolData disponibili:', this.schoolData);
    
    if (this.schoolData) {
      this.processSchoolData();
    } else if (this.schoolId) {
      this.loadSchoolContacts();
    } else {
      console.error('Nessun dato scuola e nessun ID scuola fornito nel componente SchoolFooter');
      this.error = 'Nessun dato scuola disponibile';
      this.isLoading = false;
    }
  }

  // Processa i dati della scuola già disponibili
  private processSchoolData(): void {
    try {
      console.log('Elaborazione dati scuola esistenti');
      
      // Recupera il telefono principale se presente
      if (this.schoolData?.data?.phone) {
        this.phones.push({
          id: '0',
          phone: this.schoolData.data.phone,
          description: 'Principale'
        });
      }
      
      // Recupera l'email principale se presente
      if (this.schoolData?.data?.email) {
        this.emails.push({
          id: '0',
          email: this.schoolData.data.email,
          description: 'Principale'
        });
      }
      
      // Recupera tutti i numeri di telefono
      if (this.schoolData?.data?.school_phones && Array.isArray(this.schoolData.data.school_phones)) {
        for (const phoneEntry of this.schoolData.data.school_phones) {
          if (typeof phoneEntry === 'object' && phoneEntry !== null) {
            const phone = phoneEntry as unknown as SchoolPhones;
            this.phones.push({
              id: phone.id,
              phone: phone.number,
              label: phone.label
            });
          }
        }
      }
      
      // Recupera tutte le email
      if (this.schoolData?.data?.school_emails && Array.isArray(this.schoolData.data.school_emails)) {
        for (const emailEntry of this.schoolData.data.school_emails) {
          if (typeof emailEntry === 'object' && emailEntry !== null) {
            const email = emailEntry as unknown as SchoolEmails;
            this.emails.push({
              id: email.id,
              email: email.email,
              label: email.label
            });
          }
        }
      }
      
      console.log('Contatti elaborati:', { phones: this.phones, emails: this.emails });
      this.isLoading = false;
    } catch (error) {
      console.error('Errore nell\'elaborazione dei dati della scuola:', error);
      this.error = 'Errore nell\'elaborazione dei dati della scuola';
      this.isLoading = false;
    }
  }

  // Fallback: carica i contatti tramite API
  private loadSchoolContacts(): void {
    console.log('Caricamento contatti per scuola ID:', this.schoolId);
    
    // Se non abbiamo già i dati della scuola, li carichiamo
    this.directusService.getSchoolData(this.schoolId).subscribe({
      next: (schoolData) => {
        console.log('Dati scuola caricati tramite API:', schoolData);
        this.schoolData = schoolData;
        this.processSchoolData();
      },
      error: (err) => {
        console.error('Errore nel caricamento dei dati scuola:', err);
        this.error = 'Errore nel caricamento dei dati della scuola';
        this.isLoading = false;
      }
    });
    
  }
}

