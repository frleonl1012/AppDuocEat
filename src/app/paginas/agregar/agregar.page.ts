import { Component, OnInit } from '@angular/core';
import { Producto } from '../../producto';
import { FirestoreService } from 'src/app/basededatos/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  local : string;
  producto : Producto;

  constructor(private firestoreService : FirestoreService, private alertController: AlertController,) {
    this.producto = {} as Producto;
    this.local = "";
  }

  ngOnInit() {
  }

  botonInsertar(){
    this.firestoreService.insertar(this.local, this.producto).then(
      () => {
        this.mostrarMensaje('Agregado correctamente!');
        this.producto = {} as Producto;
      }
    );
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
