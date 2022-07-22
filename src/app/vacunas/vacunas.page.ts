import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.page.html',
  styleUrls: ['./vacunas.page.scss'],
})
export class VacunasPage implements OnInit {
  mid;
  mVacuna;
  mNumeroLote;
  mNumeroDosis;
  mDosisActual;
  mHora: String = new Date().toLocaleString();
  mUltimaAplicacion: String = new Date().toLocaleString();
  mSiguienteAplicacion: String = new Date().toLocaleString();
  codigoPersona;
  correoUsuario;

  constructor(public servicio: ServicioService, public router: Router,
    public toastCtrl: ToastController, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.ruta.params.subscribe((params: Params) => {
      if(params.id == 0){
        //registra vacuna
      }else{
        this.servicio.getVacunaByID(params.id).subscribe(res => {
          this.mid = res['vacuna'].id_vacuna;
          this.mVacuna = res['vacuna'].nombre;
          this.mNumeroLote = res['vacuna'].numero_lote;
          this.mNumeroDosis = res['vacuna'].numero_dosis;
          this.mDosisActual = res['vacuna'].dosis_actual;
          this.mHora = res['vacuna'].hora;
          this.mUltimaAplicacion = res['vacuna'].ultima_aplicacion;
          this.mSiguienteAplicacion = res['vacuna'].siguiente_aplicacion;
          this.codigoPersona = res['vacuna'].fk_usuario;
        });
      }
    });
  }

  onGuardar(){
    const dataVacuna = {
      id_vacuna: this.mid,
      nombre: this.mVacuna,
      numero_lote: this.mNumeroLote,
      numero_dosis: this.mNumeroDosis,
      dosis_actual: this.mDosisActual,
      hora: this.mHora,
      ultima_aplicacion: this.mUltimaAplicacion,
      siguiente_aplicacion: this.mSiguienteAplicacion,
      fk_usuario: localStorage.getItem('id')
    }

    if(this.mid){
      this.servicio.updateVacuna(dataVacuna, this.mid).subscribe( res => {
        console.log(res);
        this.presentToast('Actualizado')
        this.router.navigate(['/listado-vacunas'])
      });
    }else{
      this.servicio.addVacuna(dataVacuna).subscribe( res => {
        console.log(res);
        this.presentToast('Guardado')
        this.router.navigate(['/listado-vacunas'])
      })
    }
  }

  async presentToast(mensaje: string){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
