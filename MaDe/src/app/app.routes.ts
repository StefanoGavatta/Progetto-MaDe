import { Routes } from '@angular/router';
import { ScuoleComponent } from './components/scuole/scuole.component';
import { PaginaSitoComponent } from './components/pagina-sito/pagina-sito.component';
import { MapsComponent } from './components/pagina-mappa/maps/maps.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ScuolaSpecificaComponent } from './components/scuola-specifica/scuola-specifica.component';
import { PaginaMappaComponent } from './components/pagina-mappa/pagina-mappa.component';

export const routes: Routes = [
    { path: '', component: HeroSectionComponent },
    { path: 'scuole', component: ScuoleComponent },
    { path: 'scuole/:id', component: ScuolaSpecificaComponent},
    { path: 'maps', component: PaginaMappaComponent},
    { path: 'calendario', component: CalendarioComponent}


];

