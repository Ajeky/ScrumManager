import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HistoriasListadoComponent } from './historias-listado/historias-listado.component';

export const DashboardRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'stories', component: HistoriasListadoComponent}
];
