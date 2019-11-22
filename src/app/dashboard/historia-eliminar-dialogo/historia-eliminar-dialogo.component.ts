import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HistoriasService } from 'src/app/services/historias.service';

export interface DatosEliminar {
  id: string;
}

@Component({
  selector: 'app-historia-eliminar-dialogo',
  templateUrl: './historia-eliminar-dialogo.component.html',
  styleUrls: ['./historia-eliminar-dialogo.component.scss']
})
export class HistoriaEliminarDialogoComponent implements OnInit {

  id: string;

  constructor(
    public dialogRef: MatDialogRef<HistoriaEliminarDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEliminar,
    private historiaServicio: HistoriasService
  ) { }

  ngOnInit() {
    this.id = this.data.id;
  }

  confirmarBorrado() {
    this.historiaServicio.deleteHistoria(this.id);
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }

}