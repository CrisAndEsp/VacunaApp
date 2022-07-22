import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro/:id',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'listado-vacunas',
    loadChildren: () => import('./listado-vacunas/listado-vacunas.module').then( m => m.ListadoVacunasPageModule)
  },
  {
    path: 'vacunas/:id',
    loadChildren: () => import('./vacunas/vacunas.module').then( m => m.VacunasPageModule)
  },
  {
    path: 'listado-enfermedades',
    loadChildren: () => import('./listado-enfermedades/listado-enfermedades.module').then( m => m.ListadoEnfermedadesPageModule)
  },
  {
    path: 'enfermedades/:id',
    loadChildren: () => import('./enfermedades/enfermedades.module').then( m => m.EnfermedadesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
