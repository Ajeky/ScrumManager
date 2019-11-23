import { Component, OnInit } from '@angular/core';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { Equipo } from 'src/app/models/equipo.interface';
import { Miembro } from 'src/app/models/miembro.interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { MatDialog } from '@angular/material';
import { EquipoCrearDialogoComponent } from '../equipo-crear-dialogo/equipo-crear-dialogo.component';
import { EquipoUnirseDialogoComponent } from '../equipo-unirse-dialogo/equipo-unirse-dialogo.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'acciones'];
  listaMiembros: FirestoreResponse<Miembro>[];
  idEquipo = '';
  equipo: Equipo;

  constructor(private equipoServicio: EquipoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.idEquipo = localStorage.getItem('idEquipo');
    if (this.idEquipo !== '' && this.idEquipo !== null) {
      this.cargarEquipo();
      this.cargarMiembros();
    } else {
      this.idEquipo = '';
    }
  }

  cargarEquipo() {
    this.equipoServicio.getEquipo(this.idEquipo).subscribe(resp => {
      this.equipo = resp;
    });
  }

  cargarMiembros() {
    this.equipoServicio.getMiembros(this.idEquipo).subscribe(resp => {
      this.listaMiembros = [];

      resp.forEach((historia: any) => {
        this.listaMiembros.push({
          id: historia.payload.doc.id,
          data: historia.payload.data() as Miembro
        });
      });
    });
  }

  dialogoCrearEquipo() {
    let dialogRef = this.dialog.open(EquipoCrearDialogoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      this.idEquipo = localStorage.getItem('idEquipo');
      this.cargarEquipo();
      this.cargarMiembros();
    })
  }

  dialogoUnirseAEquipo() {
    let dialogRef = this.dialog.open(EquipoUnirseDialogoComponent, {
      width: '400px'
    });
  }

}
