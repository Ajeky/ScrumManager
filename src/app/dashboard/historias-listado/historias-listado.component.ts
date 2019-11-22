import { Component, OnInit } from '@angular/core';
import { HistoriasService } from 'src/app/services/historias.service';
import { Historia } from 'src/app/models/historia.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HistoriaCrearDialogoComponent } from '../historia-crear-dialogo/historia-crear-dialogo.component';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { HistoriaEditarDialogComponent } from '../historia-editar-dialog/historia-editar-dialog.component';
import { HistoriaEliminarDialogoComponent } from '../historia-eliminar-dialogo/historia-eliminar-dialogo.component';

@Component({
  selector: 'app-historias-listado',
  templateUrl: './historias-listado.component.html',
  styleUrls: ['./historias-listado.component.scss']
})
export class HistoriasListadoComponent implements OnInit {

  listaHistorias: FirestoreResponse<Historia>[];
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'acciones'];

  constructor(
    private historiasServicio: HistoriasService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.cargarHistorias();
  }

  cargarHistorias() {
    this.historiasServicio.getHistorias().subscribe(resp => {
      this.listaHistorias = [];

      resp.forEach((historia: any) => {
        this.listaHistorias.push({
          id: historia.payload.doc.id,
          data: historia.payload.doc.data() as Historia
        });
      });
    });
  }

  dialogoCrearHistoria() {
    let dialogRef = this.dialog.open(HistoriaCrearDialogoComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Historia creada correctamente");
        } else {
          this.snackBar.open("Error al crear la historia");
        }
      }
    });
  }

  dialogoEditarHistoria(firestoreResponse: FirestoreResponse<Historia>) {
    const id = firestoreResponse.id;
    const historia = firestoreResponse.data;

    let dialogRef = this.dialog.open(HistoriaEditarDialogComponent, {
      width: '300px',
      data: {id: id, historia: historia}
    });
  }

  dialogoEliminarHistoria(id: string) {
    let dialogRef = this.dialog.open(HistoriaEliminarDialogoComponent, {
      width: '300px',
      data: {id: id}
    });
  }

}
