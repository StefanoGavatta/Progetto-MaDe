import { Component, AfterViewInit, Renderer2, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectusService } from '../../../services/directus.service';
import { EducationalPathsData, EducationalPath } from '../../../interfaces/educational-paths';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-indirizzi',
  imports: [CommonModule],
  templateUrl: './indirizzi.component.html',
  styleUrl: './indirizzi.component.css',
  standalone: true
})
export class IndirizziComponent implements AfterViewInit, OnInit {
  directusService = inject(DirectusService);
  educationalPaths: EducationalPath[] = [];
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
      this.loadEducationalPaths(schoolId);
    }
  }

  loadEducationalPaths(schoolId: string) {
    this.isLoading = true;
    console.log('Caricamento indirizzi per la scuola ID:', schoolId);
    
    this.subscription = this.directusService.getEduLinksForSchool(schoolId).subscribe({
      next: (response) => {
        console.log('Risposta completa dall\'API:', response);
        
        if (response && response.data && response.data.edu_links && response.data.edu_links.length > 0) {
          // Estrai le informazioni dagli edu_links
          const pathsMap = new Map();
          
          response.data.edu_links.forEach((link: any) => {
            console.log('Elaborazione link:', link);
            if (link.name) {
              // Usiamo il nome dell'edu_link come nome del percorso se non abbiamo info sull'educational_path
              if (!pathsMap.has(link.name)) {
                pathsMap.set(link.name, {
                  id: link.id,
                  name: link.name,
                  description: link.link_url || 'Nessuna descrizione disponibile',
                  links: []
                });
              }
              
              // Aggiungi il link all'elenco dei link per questo percorso
              pathsMap.get(link.name).links.push({
                url: link.link_url,
                name: link.name
              });
            }
          });
          
          // Converti la mappa in un array
          this.educationalPaths = Array.from(pathsMap.values());
          console.log('Educational paths elaborati:', this.educationalPaths);
        } else {
          console.log('Nessun educational path trovato nella risposta, caricamento dati di esempio');
          // In assenza di dati reali, carica dati di esempio per la demo
          this.loadExampleEducationalPaths();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento degli educational paths:', error);
        this.errorMessage = 'Errore nel caricamento degli indirizzi di studio. Riprova più tardi.';
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const boxes = this.el.nativeElement.querySelectorAll('.indirizzo-box:not(.empty)');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      boxes.forEach((box: Element) => observer.observe(box));
    }, 500);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
