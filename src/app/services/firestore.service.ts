import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collections: { name: string, count: number }[] = [];

  constructor(private angularFirestore: AngularFirestore) { }

  public insertar(coleccion: string, datos: Producto){
    return this.angularFirestore.collection(coleccion).add(datos);
  }
 
  public consultar(coleccion: string){
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }

  public delete(coleccion: string, id: string){
    return this.angularFirestore.collection(coleccion).doc(id).delete();
  }

  public updateProducto(id: string, data: Producto, coleccion: string) {
    return this.angularFirestore.collection(coleccion).doc(id).update(data);
  }

  public getProductById(productId: string, coleccion: string): Observable<any> {
    return this.angularFirestore.collection(coleccion).doc(productId).valueChanges();
  }


  getNumberOfDocuments(collectionName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection(collectionName).get().subscribe(snapshot => {
        const count = snapshot.size; // Obtiene el número de documentos en la colección
        resolve(count);
      }, error => {
        reject(error);
      });
    });
  }


}
