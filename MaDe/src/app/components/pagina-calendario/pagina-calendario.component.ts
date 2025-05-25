import { AfterViewInit, Component } from '@angular/core';
import { CalendarioComponent } from './calendario/calendario.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { trigger,state,style, transition, animate } from '@angular/animations';
import { NgClass } from '@angular/common'; // aggiungi questa import

@Component({
  selector: 'app-pagina-calendario',
  imports: [CalendarioComponent,NgClass],
  templateUrl: './pagina-calendario.component.html',
  styleUrl: './pagina-calendario.component.css',
  animations:[
    trigger('ngOnInit',[
      state('closed',style({ transform: 'translateX(200%)'})),
      state('open',style({ transform: 'translateX(0)'})),
      transition('closed => open',[animate('1s ease-in')])
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