import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/basededatos/firestore.service';
import { Producto } from 'src/app/producto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  arrayColeccionProductos: any = [{
    id:"",
    data: {} as Producto
  }]

  constructor(private firestoreService : FirestoreService) {
    this.obtenerListaProductos();
  }


  obtenerListaProductos(){
    this.firestoreService.consultar("castanio").subscribe(
      (resultadoConsulta) => {

        this.arrayColeccionProductos = [];
        resultadoConsulta.forEach(
          (datosProducto : any) => {
            this.arrayColeccionProductos.push({
              id: datosProducto.payload.doc.id,
              data: datosProducto.payload.doc.data()
            });
          }
        );
      
      }
    );
  }


}
