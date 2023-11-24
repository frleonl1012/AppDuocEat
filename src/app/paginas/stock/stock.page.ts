import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/basededatos/firestore.service';

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

  constructor(private firestoreService : FirestoreService) { }

  async ngOnInit() {
    await this.obtenerColecciones();
  }

  async obtenerColecciones() {
    const nombresColecciones = ['castanio', 'paradiso', 'achoclonados']; 

    for (const nombre of nombresColecciones) {
      try {
        const cantidadRegistros = await this.firestoreService.getNumberOfDocuments(nombre);
        this.colecciones.push({ nombre, cantidadRegistros });
      } catch (error) {
        console.error('Error al obtener el número de registros de la colección', nombre, error);
      }
    }
  }

}
