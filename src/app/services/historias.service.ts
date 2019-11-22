import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { HistoriaDto } from '../models/historia.dto';
import { Historia } from '../models/historia.interface';

export const collectionName = 'historias';

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {

  constructor(private db: AngularFirestore) { }

  public crearHistoria(historiaDto: HistoriaDto): Promise<DocumentReference> {
    const historiasColeccion = this.db.collection<Historia>(collectionName);

    return historiasColeccion.add(historiaDto.transformarDto());
  }

  public getHistorias() {
    return this.db.collection<Historia>(collectionName).snapshotChanges();
  }

  public updateHistoria(id: string, historia: Historia) {
    return this.db.collection<Historia>(collectionName).doc(id).update(historia);
  }

  public deleteHistoria(id: string) {
    return this.db.collection<Historia>(collectionName).doc(id).delete();
  }

}
