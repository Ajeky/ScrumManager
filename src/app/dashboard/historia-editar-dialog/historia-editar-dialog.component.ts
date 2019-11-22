import { Component, OnInit, Inject } from '@angular/core';
import { Historia } from 'src/app/models/historia.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HistoriasService } from 'src/app/services/historias.service';

export interface DatosEditar {
  id: string;
  historia: Historia;
}

@Component({
  selector: 'app-historia-editar-dialog',
  templateUrl: './historia-editar-dialog.component.html',
  styleUrls: ['./historia-editar-dialog.component.scss']
})
export class HistoriaEditarDialogComponent implements OnInit {
  id: string;
  historia: Historia;
  estados = ['NO_ASIGNADA', 'EN_PROGRESO', 'REALIZADA'];

  constructor(
    public dialogRef: MatDialogRef<HistoriaEditarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEditar,
    private historiaServicio: HistoriasService
  ) { }

  ngOnInit() {
    this.id = this.data.id;
    this.historia = this.data.historia;
  }

  editarHistoria() {
    this.historiaServicio.updateHistoria(this.id, this.historia);
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
