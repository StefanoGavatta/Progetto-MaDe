import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MapsComponent } from './components/maps/maps.component';
import { PaginaSitoComponent } from './components/pagina-sito/pagina-sito.component';

import { HeaderComponent } from './components/header/header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HeroSection2Component } from './components/hero-section-2/hero-section-2.component';

import { ScuoleComponent } from './components/scuole/scuole.component';
import { ScuolaSpecificaComponent } from './components/scuola-specifica/scuola-specifica.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, ScuolaSpecificaComponent,CalendarioComponent,MapsComponent,PaginaSitoComponent,  HeaderComponent, HeroSectionComponent, HeroSection2Component, ScuoleComponent, ScuolaSpecificaComponent,FooterComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MaDe';
  meetings = {
    '2024-04-05': ["test1", "test2", "test2", "test2", "test2", "test2", "test2"],
  };
}
