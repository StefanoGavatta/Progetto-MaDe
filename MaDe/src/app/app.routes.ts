import { Routes } from '@angular/router';
import { ScuoleComponent } from './components/scuole/scuole.component';
import { PaginaSitoComponent } from './components/pagina-sito/pagina-sito.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

export const routes: Routes = [
    { path: '', component: HeroSectionComponent },
    { path: 'scuole', component: ScuoleComponent },
    { path: 'scuola/:id', component: PaginaSitoComponent},
    { path: 'maps', component: MapsComponent},
    { path: 'calendario', component: CalendarioComponent}


];

