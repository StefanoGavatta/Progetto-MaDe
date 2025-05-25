import { AfterViewInit, Component } from '@angular/core';
import { CalendarioComponent } from './calendario/calendario.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { trigger,state,style, transition, animate, group, query } from '@angular/animations';
import { NgClass } from '@angular/common'; // aggiungi questa import

@Component({
  selector: 'app-pagina-calendario',
  imports: [CalendarioComponent,NgClass],
  templateUrl: './pagina-calendario.component.html',
  styleUrl: './pagina-calendario.component.css',
animations: [
  trigger('handAnimationTrigger', [
    state('start', style({
      opacity: 0,
      pointerEvents: 'auto'
    })),
    state('end', style({
      opacity: 1,
      pointerEvents: 'none'
    })),
    transition('start => end', [
      group([
        query('rosa', [
          style({ right: '-100%', opacity: 0 }),
          animate('3s ease-out', style({ right: '-3.3%', opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ])
]
})
export class PaginaCalendarioComponent implements AfterViewInit {
  protected menuState: 'open' | 'closed' = 'closed'



  constructor() { }

  bgAnimated = false;

   ngOnInit() {
    setTimeout(() => {
      this.bgAnimated = true;
    }, 100); // leggero delay per triggerare la transizione
  } 

  ngAfterViewInit() {
    this.bgAnimated = false;
    setTimeout(() => {
      this.bgAnimated = true;
    }, 100); // delay per triggerare la transizione
  }
  
}
bootstrapApplication(PaginaCalendarioComponent,{
  providers:[
    provideAnimationsAsync()
  ]
})