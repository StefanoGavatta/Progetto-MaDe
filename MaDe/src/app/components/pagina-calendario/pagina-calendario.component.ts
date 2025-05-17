import { Component } from '@angular/core';
import { CalendarioComponent } from './calendario/calendario.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { trigger,state,style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pagina-calendario',
  imports: [CalendarioComponent],
  templateUrl: './pagina-calendario.component.html',
  styleUrl: './pagina-calendario.component.css',
  animations:[
    trigger('ngOnInit',[
      state('closed',style({ transform: 'translateX(120%)'})),
      state('open',style({ transform: 'translateX(0)'})),
      transition('closed => open',[animate('1s ease-in')])
    ])
  ]
})
export class PaginaCalendarioComponent{
  protected menuState: 'open' | 'closed' = 'closed'

  ngOnInit() {
    setTimeout(() => {
      this.menuState = 'open';
    });
  }
  
}
bootstrapApplication(PaginaCalendarioComponent,{
  providers:[
    provideAnimationsAsync()
  ]
})