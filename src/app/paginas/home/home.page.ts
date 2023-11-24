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

  segment: string;

  constructor(private firestoreService : FirestoreService) {
    this.segment = "castanio";
    this.obtenerListaProductos();
  }


  cambiarSegmento() {
    this.obtenerListaProductos(); 
  }


  obtenerListaProductos(){
  
    this.firestoreService.consultar(this.segment).subscribe(
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
