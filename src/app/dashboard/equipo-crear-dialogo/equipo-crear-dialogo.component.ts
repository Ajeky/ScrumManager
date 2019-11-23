import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/services/equipo.service';
import { MatDialogRef } from '@angular/material';

declare var require: any;
var random = require('random-string-generator');

@Component({
  selector: 'app-equipo-crear-dialogo',
  templateUrl: './equipo-crear-dialogo.component.html',
  styleUrls: ['./equipo-crear-dialogo.component.scss']
})
export class EquipoCrearDialogoComponent implements OnInit {
  nombre: string = '';
  suscripcion;

  constructor(private equipoServicio: EquipoService, public dialogRef: MatDialogRef<EquipoCrearDialogoComponent>) { }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

  validateForm() {
    return (this.nombre == '')? true : false;
  }
  
  crearEquipo() {
    let codigoAleatorio = random(8);
    this.suscripcion = this.equipoServicio.comprobarCodigoAcceso(codigoAleatorio).subscribe(resp => {
      if (resp.length === 0) {
        this._crearEquipo(codigoAleatorio);
      } else {
        this.crearEquipo();
      }
    });
  }

  _crearEquipo(codigoAleatorio: string) {
    this.suscripcion.unsubscribe();
    this.equipoServicio.crearEquipo(this.nombre, codigoAleatorio).then(resp => {
      this.dialogRef.close();
    });
  }

}
