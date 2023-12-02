import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Usuario = {
    nombre: '',
    carrera: '',
    telefono: '',
    rol: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: FirestoreService
  ) 
  { 
    this.loginUsuario();
  }

  ngOnInit() {
  }

  loginUsuario(){
    this.authService.getEstadoLogin().subscribe(
      res => {
        if(res){
          this.getPerfil(res.uid);
        }else{
          console.log('estado: no logueado');
          
        }
      }
    );
  }

  getPerfil(uid:string){
    const path = 'usuarios';
    const id = uid;
    this.firestore.getPerfilById(id,path).subscribe(
      (data) => {
        if(data){
          this.usuario = data;  
        }else{
          console.log("No se encontraron datos para el perfil");
        }
      },
      (error) => {
        console.log("Error al obtener el perfil:", error)
      }
    );

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
