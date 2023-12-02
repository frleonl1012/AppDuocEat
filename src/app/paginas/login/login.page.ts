import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    correo: '',
    password: ''
  }

  constructor(
    private auth : AuthService, 
    private toastController: ToastController, 
    private router: Router) { }

  ngOnInit() {
  }

  async login(){
    const res =  await this.auth.login(this.credenciales.correo, this.credenciales.password)
    .catch(error => {
      this.presentToast('Usuario o password incorrectos', 'danger');
    });
    if(res){
      console.log(res);
      this.router.navigate(['/home']);
    }
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
