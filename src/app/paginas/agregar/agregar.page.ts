import { Component, OnInit } from '@angular/core';
import { Producto } from '../../producto';
import { FirestoreService } from 'src/app/basededatos/firestore.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  local : string;
  producto : Producto;

  constructor(private firestoreService : FirestoreService) {
    this.producto = {} as Producto;
    this.local = "";
  }

  ngOnInit() {
  }

  botonInsertar(){
    this.firestoreService.insertar(this.local, this.producto).then(
      () => {
        console.log('Producto creado correctamente!');
        this.producto = {} as Producto;
      }
    );
  }

}
