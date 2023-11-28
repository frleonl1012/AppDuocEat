import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockPageRoutingModule } from './stock-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StockPage } from './stock.page';
import { ModificarProductoComponent } from '../../componentes/modificar-producto/modificar-producto.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StockPageRoutingModule
  ],
  declarations: [StockPage, ModificarProductoComponent]
})
export class StockPageModule {}
