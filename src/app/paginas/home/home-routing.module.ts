import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ProductoDetailPage } from './producto-detail/producto-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'detalle/:idProducto/:idColeccion',
    component: ProductoDetailPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
