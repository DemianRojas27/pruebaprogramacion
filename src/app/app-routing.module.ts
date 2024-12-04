import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./menuprincipal/menuprincipal.module').then(m => m.MenuprincipalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./HOME/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'misasignaturas',
    loadChildren: () => import('./misasignaturas/misasignaturas.module').then( m => m.MisasignaturasPageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./asistencias/asistencias.module').then( m => m.AsistenciasPageModule)
  },
  {
    path: 'registrarasistencia',
    loadChildren: () => import('./registrarasistencia/registrarasistencia.module').then( m => m.RegistrarasistenciaPageModule)
  },
  {
    path: 'cambiarclave',
    loadChildren: () => import('./cambiarclave/cambiarclave.module').then( m => m.CambiarclavePageModule)
  },
  {
    path: 'xd',
    loadChildren: () => import('./xd/xd.module').then( m => m.XdPageModule)
  },
  {
    path: 'profe1',
    loadChildren: () => import('./Profe1/profe.module').then( m => m.ProfePageModule)
  },
  {
    path: 'registroasistprofe',
    loadChildren: () => import('./registroasistprofe/registroasistprofe.module').then( m => m.RegistroasistprofePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
