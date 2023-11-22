import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../producto';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  public insertar(coleccion: string, datos: Producto){
    return this.angularFirestore.collection(coleccion).add(datos);
  }

  public consultar(coleccion: string){
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }

}
