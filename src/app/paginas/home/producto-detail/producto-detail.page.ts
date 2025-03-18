import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.page.html',
  styleUrls: ['./producto-detail.page.scss'],
})

export class ProductoDetailPage implements OnInit {

  productId!: string;
  coleccion!: string;
  product: any;
  nombresColecciones: { [key: string]: string } = {
    castanio: "Castaño",
    paradiso: "Paradiso",
    achoclonados: "Achoclonados"
  };

  imagenesColecciones: { [key: string]: string } = {
    castanio: "https://cencomalls.cl/sites/default/files/styles/rm_tiendas_fotos_y_mapas/public/fotos-tienda/CASTAN%25CC%2583O.jpg.webp?itok=VkXLWuIj",
    paradiso: "https://media-cdn.tripadvisor.com/media/photo-s/16/c1/72/4b/nuestras-vitrinas.jpg",
    achoclonados: "https://tofuu.getjusto.com/orioneat-prod-resized/T88NhRAKGTYW58WFT-300-500.webp"
  };


  constructor(private firestoreService:FirestoreService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('idProducto') ! ;
    this.coleccion = this.route.snapshot.paramMap.get('idColeccion') !;
    this.getProductDetails();
    
    
  }

  getProductDetails(){
    if(this.productId){
      this.firestoreService.getProductById(this.productId, this.coleccion).subscribe(
        (data) => {
          if(data){
            this.product = data;
          }else{
            console.log("No se encontraron datos para el producto");
          }
        },
        (error) => {
          console.log("Error al obtener los detalles:", error)
        }
      );
    }
  }

}
