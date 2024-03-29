import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    children:[
      {
        path : '',
        loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'detalle/:idProducto/:idColeccion',
        loadChildren: () => import('./paginas/home/producto-detail/producto-detail.module').then( m => m.ProductoDetailPageModule)
      },
    ],
    //canActivate: [AuthGuard]
   
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'agregar',
    loadChildren: () => import('./paginas/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./paginas/stock/stock.module').then( m => m.StockPageModule)
    
  },
  {
    path: 'carrito',
    loadChildren: () => import('./paginas/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
