import { Component, Input, OnChanges, OnInit, SimpleChanges, inject, input } from '@angular/core';
import { DirectusService } from '../../../services/directus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  @Input() video: string = " ";
  directusService = inject(DirectusService)
  videoId: string = " "

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log(this.video)


    this.activatedRoute.params.subscribe(parametriNellaURL => {
      let id: string = parametriNellaURL['id']
      this.directusService.getSchoolData(id).subscribe(dati => {
        console.log(dati)
        this.directusService.getVideoUrl(dati?.data.videos[0] ?? "").subscribe(bho => {
          console.log(bho)
          this.videoId = bho?.video_file ?? ""
          console.log(this.videoId)
        });
      });
    })


  }
}
