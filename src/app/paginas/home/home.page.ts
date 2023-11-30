import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Producto } from 'src/app/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private firestoreService : FirestoreService, 
    private carritoService : CarritoService,
    private toastController: ToastController
  ) {
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

  async addToCarrito(nombre: any, precio: any) {
    try {
      await this.carritoService.addToCarrito(nombre, precio);
      this.presentToast('Agregado al carrito correctamente', 'success');
    } catch (error) {
      this.presentToast('Error al agregar al carrito', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del mensaje en milisegundos
      position: 'bottom', // Posición del mensaje en la pantalla
      color: color 
    });
    toast.present();
  }

}
