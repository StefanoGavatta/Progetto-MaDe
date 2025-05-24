import { Component, Input, OnInit, inject } from '@angular/core';
import { DirectusService } from '../../../services/directus.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeResourceUrlPipe } from '../../../pipes/safe-resource-url.pipe';

@Component({
  selector: 'app-video',
  imports: [CommonModule, SafeResourceUrlPipe],
  standalone: true,
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  @Input() video: string = "";
  directusService = inject(DirectusService);
  videoId: string = "";
  videoTitle: string = "";
  isLoading: boolean = true;
  hasError: boolean = false;
  youtubeId: string | null = null;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('Video component initialized with input:', this.video);
    
    if (this.video && this.video.trim() !== '') {
      console.log('Using provided video ID:', this.video);
      this.loadVideoData(this.video);
    } else {
      console.log('No video ID provided, trying to get from route params');
      this.activatedRoute.params.subscribe(parametriNellaURL => {
        const id: string = parametriNellaURL['id'];
        if (id) {
          console.log('Found school ID in route params:', id);
          this.directusService.getSchoolData(id).subscribe({
            next: (dati) => {
              console.log('School data received:', dati);
              // Controlla prima videos[0], poi videos[1], ecc.
              if (dati?.data?.videos) {
                let videoFound = false;
                
                // Funzione per trovare il primo video valido
                for (let i = 0; i < dati.data.videos.length; i++) {
                  const videoItem = dati.data.videos[i];
                  if (typeof videoItem === 'object' && videoItem.id) {
                    console.log(`Found video at index ${i}:`, videoItem.id);
                    this.loadVideoData(videoItem.id);
                    videoFound = true;
                    break;
                  } else if (typeof videoItem === 'string' && videoItem) {
                    console.log(`Found video ID at index ${i}:`, videoItem);
                    this.loadVideoData(videoItem);
                    videoFound = true;
                    break;
                  }
                }
                
                if (!videoFound) {
                  console.error('Nessun video valido trovato nell\'array videos');
                  this.isLoading = false;
                  this.hasError = true;
                }
              } else {
                console.error('Nessun array videos trovato nei dati della scuola');
                this.isLoading = false;
                this.hasError = true;
              }
            },
            error: (err) => {
              console.error('Errore nel caricamento della scuola:', err);
              this.isLoading = false;
              this.hasError = true;
            }
          });
        } else {
          console.error('Nessun ID scuola trovato nei parametri della route');
          this.isLoading = false;
          this.hasError = true;
        }
      });
    }
  }

  private loadVideoData(videoId: string): void {
    if (!videoId) {
      this.isLoading = false;
      this.hasError = true;
      return;
    }
    
    this.isLoading = true;
    this.hasError = false;
    
    this.directusService.getVideoUrl(videoId).subscribe({
      next: (response) => {
        console.log('Video data received:', response);
        if (response && response.data) {
          const videoData = response.data;
          this.videoTitle = videoData.title || '';
          
          if (videoData.youtube_id) {
            this.youtubeId = videoData.youtube_id;
            console.log('YouTube video ID:', this.youtubeId);
          } else if (videoData.video_file) {
            this.videoId = videoData.video_file;
            console.log('Video file:', this.videoId);
          } else {
            console.error('Nessun file video o ID YouTube trovato:', videoData);
            this.hasError = true;
          }
        } else {
          console.error('Risposta API non valida:', response);
          this.hasError = true;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento del video:', err);
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }
}
