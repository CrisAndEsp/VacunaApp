import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuController, ToastController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-listado-enfermedades',
  templateUrl: './listado-enfermedades.page.html',
  styleUrls: ['./listado-enfermedades.page.scss'],
})
export class ListadoEnfermedadesPage implements OnInit {
  
  enfermedades;
  textoBuscar;

  constructor(public servicio: ServicioService, public router: Router, private ruta: ActivatedRoute,
    public toastCrl: ToastController, public alertContrller: AlertController, public menu: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.onListado();
    this.menu.enable(true);
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  onListado(){
    this.ruta.params.subscribe((params: Params) => {
      this.servicio.getEnfermedadByID(localStorage.getItem('id')).subscribe( res => {
        this.enfermedades = res['enfermedadlista'];
        console.log(res)
      });
    });
  }

  onNuevo(){
    this.router.navigate(['/enfermedades', 0])
  }

  eliminar(item){
    this.servicio.deleteEnfermedad(item.id_enfermedad).subscribe( res => {
      this.presentToast('Enfermedad Eliminada');
    })
  }

  editar(item){
    this.router.navigate(['enfermedades', item.id_enfermedad])
  }

  async presentToast(mensaje: string){
    const toast = await this.toastCrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
