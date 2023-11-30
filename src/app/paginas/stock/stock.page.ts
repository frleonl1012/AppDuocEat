import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Producto } from 'src/app/producto';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  colecciones: { nombre: string, cantidadRegistros: number }[] = [];

  nombresColecciones: { [key: string]: string } = {
    castanio: "Castaño",
    paradiso: "Paradiso",
    achoclonados: "Achoclonados"
  };

  arrayColeccionProductos: any = [{
    id:"",
    data: {} as Producto
  }]

  segment: string;

  productoSeleccionado: any;




  constructor(private firestoreService : FirestoreService) { 
    this.segment = "castanio";
    this.obtenerListaProductos();
  }

  async ngOnInit() {
    await this.obtenerColecciones();
  }

  eliminar(id: string){
    this.firestoreService.delete(this.segment, id);
    this.obtenerColecciones();
  }

  mostrarFormulario(producto: any) {
    this.productoSeleccionado = producto;
  }

  async obtenerColecciones() {
    const nombresColecciones = ['castanio', 'paradiso', 'achoclonados']; 
    this.colecciones = [];
    for (const nombre of nombresColecciones) {
      try {
        const cantidadRegistros = await this.firestoreService.getNumberOfDocuments(nombre);
        this.colecciones.push({ nombre, cantidadRegistros });
      } catch (error) {
        console.error('Error al obtener el número de registros de la colección', nombre, error);
      }
    }
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
