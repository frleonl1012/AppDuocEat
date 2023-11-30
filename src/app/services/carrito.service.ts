import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Element, CarritoCompras } from '../paginas/carrito/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  clientName!:string;

  totalCompra:number = 0;

  carrito:Element[] = [];

  constructor(
    private router:Router,
  ) { }


  borrarCarrito() {
    this.carrito = []; 
    this.totalCompra = 0; 
  }

  addToCarrito(nombre: any, precio: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.carrito.push({
          nombre,
          precio,
        });
  
        this.totalCompra = this.getTotalCarrito();
  
        // La operación se realizó con éxito, resolvemos la promesa
        resolve();
      } catch (error) {
        // Ocurrió un error, rechazamos la promesa con el error
        reject(error);
      }
    });
  }

  getTotalCarrito (){
      return this.carrito.reduce((total, item) => {
          return Number(total) + Number(item.precio)
      }, 0);
  }

  getCarrito (){
    return [...this.carrito];
  }

  getTotal (){
    return this.totalCompra;
  }
  
}