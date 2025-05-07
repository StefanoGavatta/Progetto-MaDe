import { Routes } from '@angular/router';
import { ScuoleComponent } from './components/scuole/scuole.component';
import { PaginaSitoComponent } from './components/pagina-sito/pagina-sito.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

export const routes: Routes = [
    { path: '', component: ScuoleComponent },
    { path: 'scuola/:id', component: PaginaSitoComponent},
    { path: 'maps', component: MapsComponent},
    { path: 'calendario', component: CalendarioComponent},


];

