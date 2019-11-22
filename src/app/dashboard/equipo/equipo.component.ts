import { Component, OnInit } from '@angular/core';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { Equipo } from 'src/app/models/equipo.interface';
import { Miembro } from 'src/app/models/miembro.interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { MatDialog } from '@angular/material';

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
    }
  }

  cargarMiembros() {
    this.equipoServicio.getMiembros(this.idEquipo).subscribe(resp => {
      this.listaMiembros = [];
    })
  }

}
