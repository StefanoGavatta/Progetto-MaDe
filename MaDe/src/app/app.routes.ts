import { Routes } from '@angular/router';
import { ScuoleComponent } from './components/scuole/scuole.component';
import { PaginaSitoComponent } from './components/pagina-sito/pagina-sito.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ScuolaSpecificaComponent } from './components/scuola-specifica/scuola-specifica.component';
import { HeroSection2Component } from './components/hero-section-2/hero-section-2.component';

export const routes: Routes = [
    { path: 'hero', component: HeroSection2Component },
    { path: 'scuole', component: ScuoleComponent },
    { path: 'scuole/:id', component: ScuolaSpecificaComponent},
    { path: 'maps', component: MapsComponent},
    { path: 'calendario', component: CalendarioComponent}


];

