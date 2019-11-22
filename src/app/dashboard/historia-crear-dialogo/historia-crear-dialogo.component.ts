import { Component, OnInit } from '@angular/core';
import { HistoriaDto } from 'src/app/models/historia.dto';
import { MatDialogRef } from '@angular/material';
import { HistoriasService } from 'src/app/services/historias.service';

@Component({
  selector: 'app-historia-crear-dialogo',
  templateUrl: './historia-crear-dialogo.component.html',
  styleUrls: ['./historia-crear-dialogo.component.scss']
})
export class HistoriaCrearDialogoComponent implements OnInit {
  historiaDto: HistoriaDto;
  
  constructor(
    public dialogRef: MatDialogRef<HistoriaCrearDialogoComponent>,
    private historiaServicio: HistoriasService
  ) { }

  ngOnInit() {
    this.historiaDto = new HistoriaDto('', '', 'NO_ASIGNADA');
  }

  guardarHistoria() {
    this.historiaServicio.crearHistoria(this.historiaDto).then(resp => {
      this.dialogRef.close(true);
    }).catch(resp => {
      this.dialogRef.close(false);
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

}
