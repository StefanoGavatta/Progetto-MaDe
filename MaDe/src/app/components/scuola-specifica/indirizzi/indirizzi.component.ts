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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadExampleEducationalPaths() {
    // Dati di esempio per la demo se l'API non restituisce risultati
    this.educationalPaths = [
      {
        id: 'example-1',
        name: 'Indirizzo Tecnico Informatico',
        description: 'L\'indirizzo tecnico informatico forma professionisti in grado di sviluppare software, amministrare reti e gestire sistemi informatici. Il percorso include corsi di programmazione, basi di dati, reti e sicurezza informatica.',
        links: [
          { url: 'https://www.example.com/info-it', name: 'Dettagli del corso' },
          { url: 'https://www.example.com/lab-it', name: 'Laboratori disponibili' }
        ]
      },
      {
        id: 'example-2',
        name: 'Indirizzo Economico Aziendale',
        description: 'L\'indirizzo economico aziendale prepara gli studenti nella gestione amministrativa e finanziaria delle imprese. Gli studenti studieranno economia, diritto, contabilità e marketing.',
        links: [
          { url: 'https://www.example.com/info-business', name: 'Piano di studi' },
          { url: 'https://www.example.com/opportunities', name: 'Sbocchi professionali' }
        ]
      },
      {
        id: 'example-3',
        name: 'Indirizzo Linguistico',
        description: 'L\'indirizzo linguistico offre una formazione approfondita nelle lingue straniere (inglese, francese, tedesco, spagnolo) e nelle relative culture. Comprende studio della letteratura, conversazione e certificazioni linguistiche.',
        links: [
          { url: 'https://www.example.com/lang-programs', name: 'Programma dettagliato' }
        ]
      },
      {
        id: 'example-4',
        name: 'Indirizzo Scientifico',
        description: 'L\'indirizzo scientifico fornisce una solida preparazione in matematica, fisica, chimica e biologia. Adatto a studenti interessati a carriere scientifiche o ingegneristiche.',
        links: [
          { url: 'https://www.example.com/science-lab', name: 'Attività laboratoriali' },
          { url: 'https://www.example.com/science-projects', name: 'Progetti scientifici' }
        ]
      }
    ];
    console.log('Caricati indirizzi di esempio:', this.educationalPaths.length);
  }
}
