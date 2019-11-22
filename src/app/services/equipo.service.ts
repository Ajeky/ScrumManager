import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Equipo } from '../models/equipo.interface';
import { EquipoDto } from '../models/equipo.dto';

export const collectionName = 'equipos';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private db: AngularFirestore) { }

  comprobarCodigoAcceso(codigoAleatorio: string) {
    return this.db.collection(collectionName, ref => ref.where('codigo_acceso', '==', codigoAleatorio)).valueChanges();
  }

  async crearEquipo(nombre: string, codigoAleatorio: string) {
    let uid = localStorage.getItem('uid');

    let equipoDto = new EquipoDto(nombre, uid, codigoAleatorio);

    let nuevoEquipo = await this.db.collection(collectionName).add(equipoDto.transformarDto()).then(resp => {return resp; });

    localStorage.setItem('equipoId', nuevoEquipo.id);

    this.db.collection(collectionName).doc(nuevoEquipo.id).collection('miembros').doc(uid).set({
      nombre: localStorage.getItem('nombre')
    });

    return this.db.collection('usuarios').doc(uid).update({
      equipoId: localStorage.getItem('equipoId')
    });
  }

  unirseAUnEquipo(codigoAcceso: string) {
    let uid = localStorage.getItem('uid');
    let nombreUsuario = localStorage.getItem('nombre');

    this.db.collection(collectionName, ref => ref.where('codigo_acceso', '==', codigoAcceso))
    .snapshotChanges().subscribe(resp => {
      if (resp.length == 1) {
        let equipo = resp[0];

        return this.db.collection(collectionName).doc(equipo.payload.doc.id).collection('miembros')
        .doc(uid).set (
          {nombre: nombreUsuario}
        );
      } else {
        return null;
      }
    });
  }

  public getEquipo(idEquipo: string) {
    return this.db.collection<Equipo>(collectionName).doc<Equipo>(idEquipo).snapshotChanges();
  }

  public getMiembros(idEquipo: string) {
    return this.db.collection(collectionName).doc(idEquipo).collection('miembros').snapshotChanges();
  }

}
