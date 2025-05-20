import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPage } from './usuarios.page';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  },
  {
      path: 'new',
      component: UsuariosFormComponent
  },
  {
    path: 'edit/:usuariosId',
    component: UsuariosFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
