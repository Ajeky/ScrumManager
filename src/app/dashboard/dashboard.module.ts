import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatChipsModule,
  MatTableModule,
  MatFormFieldModule,
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MatSnackBar,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { HistoriasListadoComponent } from './historias-listado/historias-listado.component';
import { HistoriasService } from '../services/historias.service';
import { HistoriaCrearDialogoComponent } from './historia-crear-dialogo/historia-crear-dialogo.component';
import { FormsModule } from '@angular/forms';
import { HistoriaEditarDialogComponent } from './historia-editar-dialog/historia-editar-dialog.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HistoriaEliminarDialogoComponent } from './historia-eliminar-dialogo/historia-eliminar-dialogo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    ChartsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    MatChipsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [DashboardComponent, HistoriasListadoComponent, HistoriaCrearDialogoComponent, HistoriaEditarDialogComponent, HistoriaEliminarDialogoComponent],
  providers: [
    HistoriasService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
  entryComponents: [HistoriaCrearDialogoComponent, HistoriaEditarDialogComponent, HistoriaEliminarDialogoComponent]
})
export class DashboardModule {}
