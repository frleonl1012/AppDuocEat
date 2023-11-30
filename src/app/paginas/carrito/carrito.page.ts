import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Element } from './carrito';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito! : Element[];
  total!: number;

  constructor(
    private carritoService:CarritoService, 
    private router:Router, 
    private toastController: ToastController
  ) { 
    this.getCarrito();
    this.getTotal();
  }

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
    this.getTotal();
  }

  async getCarrito(){
    this.carrito = this.carritoService.getCarrito();
    return this.carrito;
  }

  async getTotal(){
    this.total = this.carritoService.getTotal();
    return this.total;
  }

  borrarCarrito() {
    this.carritoService.borrarCarrito(); 
    this.presentToast('¡Gracias por tu compra!', 'success');
    this.carrito = [];
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
