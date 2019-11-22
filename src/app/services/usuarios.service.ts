import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioDto } from '../models/usuario.dto';

export const collectionName = 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFirestore) { }

  public createUsuario(uid: string, usuarioDto: UsuarioDto) {
    return this.db.collection(collectionName).doc(uid).set(
      usuarioDto.transformarDto()
    );
  }

}