import { Routes } from '@angular/router';
import { ScuoleComponent } from './components/scuole/scuole.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ScuolaSpecificaComponent } from './components/scuola-specifica/scuola-specifica.component';
import { PaginaMappaComponent } from './components/pagina-mappa/pagina-mappa.component';
import { PaginaCalendarioComponent } from './components/pagina-calendario/pagina-calendario.component';

export const routes: Routes = [
    { path: '', component: HeroSectionComponent },
    { path: 'scuole', component: ScuoleComponent },
    { path: 'scuole/:id', component: ScuolaSpecificaComponent},
    { path: 'maps', component: PaginaMappaComponent},
    { path: 'calendario', component: PaginaCalendarioComponent}


];

