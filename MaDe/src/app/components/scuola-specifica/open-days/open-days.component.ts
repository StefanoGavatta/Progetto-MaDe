import { Component, AfterViewInit, Renderer2, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectusService } from '../../../services/directus.service';
import { Subscription } from 'rxjs';
import { EventsData, Daum } from '../../../interfaces/events-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-open-days',
  imports: [CommonModule, DatePipe],
  templateUrl: './open-days.component.html',
  styleUrl: './open-days.component.css',
  standalone: true
})
export class OpenDaysComponent implements AfterViewInit, OnInit {
  directusService = inject(DirectusService);
  events: Daum[] = [];
  isLoading = true;
  errorMessage = '';
  private subscription: Subscription | null = null;
  private currentSchoolId: string = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // Otteniamo l'ID della scuola dalla URL
    const pathParts = window.location.pathname.split('/');
    const schoolId = pathParts[pathParts.length - 1];
    
    if (schoolId) {
      this.currentSchoolId = schoolId;
      this.loadEvents(schoolId);
    }
  }

  loadEvents(schoolId: string) {
    this.isLoading = true;
    console.log('Caricamento open days per la scuola ID:', schoolId);
    
    this.subscription = this.directusService.getEventsForSchool(schoolId).subscribe({
      next: (response) => {
        console.log('Risposta completa dall\'API degli eventi:', response);
        
        if (response && response.data && response.data.length > 0) {
          this.events = response.data;
          console.log('Eventi per questa scuola:', this.events);
          
          // Ordina gli eventi per data di inizio (dal più recente)
          this.events.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
        } else {
          console.log('Nessun evento trovato nella risposta');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento degli eventi:', error);
        this.errorMessage = 'Errore nel caricamento degli open day. Riprova più tardi.';
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const boxes = this.el.nativeElement.querySelectorAll('.event-box:not(.empty)');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Rendi visibile la card
            this.renderer.addClass(entry.target, 'visible');
            
            // Determina se la card è nella colonna sinistra o destra 
            // Box dispari (indice 0, 2, 4...) sono nella colonna sinistra
            // Box pari (indice 1, 3, 5...) sono nella colonna destra
            const boxIndex = Array.from(boxes).indexOf(entry.target as Element);
            const isLeftColumn = boxIndex % 2 === 0; // Se è nella colonna di sinistra
            
            // Aggiungi le classi di animazione di Animate.css
            this.renderer.addClass(entry.target, 'animate__animated');
            
            // Utilizziamo animate__slideInUp per tutte le card indipendentemente dalla posizione
            this.renderer.addClass(entry.target, 'animate__slideInUp');
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      boxes.forEach((box: Element) => {
        observer.observe(box);
      });
    }, 100);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Formatta la data in un formato leggibile
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
