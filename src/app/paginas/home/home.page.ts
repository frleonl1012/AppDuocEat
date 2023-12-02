import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Producto } from 'src/app/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario';

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

  usuario: Usuario = {
    nombre: '',
    carrera: '',
    telefono: '',
    rol: ''
  };

  constructor(
    private firestoreService : FirestoreService, 
    private carritoService : CarritoService,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {
    this.segment = "castanio";
    this.obtenerListaProductos();
    this.loginUsuario()
    
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

  addToCarrito(nombre: any, precio: any) {
    try {
      this.carritoService.addToCarrito(nombre, precio);
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

  loginUsuario(){
    this.authService.getEstadoLogin().subscribe(
      res => {
        if(res){
          this.getPerfil(res.uid);
        }else{
          console.log('estado: no logueado');
          
        }
      }
    );
  }

  getPerfil(uid:string){
    const path = 'usuarios';
    const id = uid;
    this.firestoreService.getPerfilById(id,path).subscribe(
      (data) => {
        if(data){
          this.usuario = data;  
        }else{
          console.log("No se encontraron datos para el perfil");
        }
      },
      (error) => {
        console.log("Error al obtener el perfil:", error)
      }
    );

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
