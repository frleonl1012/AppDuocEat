import { Component, OnInit,  Input, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from 'src/app/basededatos/firestore.service';
import { ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.scss'],
})
export class ModificarProductoComponent  implements OnInit {

  @Input() producto: any;
  @Input() id: any;
  @Input() local: any;
  @ViewChild(IonModal) modal!: IonModal;

  form: FormGroup;
  name: string;
  nomLocal: string;

  constructor(private fb: FormBuilder, private firestoreService: FirestoreService, private toastController: ToastController, private loadingController: LoadingController) { 
    this.form = this.fb.group({
      nombre: [''],
      precio: ['']
    });
    this.name = 'hola';
    this.nomLocal = '';
    
  }
  

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  ngOnChanges() {
    if (this.producto) {
      this.form.patchValue({
        nombre: this.producto.data.nombre,
        precio: this.producto.data.precio
      });
    }
  }

  ngOnInit() {
    this.nomLocal = this.local;    
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios...',
    });
    await loading.present();
  
    this.firestoreService.updateProducto(this.producto.id, this.form.value, this.nomLocal)
      .then(() => {
        loading.dismiss();
        this.presentToast('Producto modificado correctamente', 'success');
        this.modal.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        console.error('Error al actualizar el producto', error);
        this.presentToast('Error al actualizar el producto', 'danger');
      });
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
