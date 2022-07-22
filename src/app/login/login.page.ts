import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  codigoUsuario;
  email;
  password;

  constructor(public router: Router, public servicio: ServicioService,
    public toastCrl: ToastController, public menu: MenuController) { }
  
  onRegistrarse(){
    this.router.navigate(['/registro', 0]);
  }

  forgotPass(){
    this.router.navigate(['/recuperar']);
  }

  login(){
    const dataUsuario = {
      correo: this.email,
      password: this.password
    };
    this.servicio.login(dataUsuario).subscribe(res => {
      this.codigoUsuario = res['usuarioIngresar'].id_usuario;
      localStorage.setItem('id', this.codigoUsuario);
      this.router.navigate(['/home'])
      this.presentToast('BIENVENIDO');
    })
  }

  async presentToast( mensaje: string){
    const toast = await this.toastCrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }

  ngOnInit() {
  }

}
