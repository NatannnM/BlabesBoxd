import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { UsuariosFormNovoComponent } from '../usuarios/usuarios-form-novo/usuarios-form-novo.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'new',
    component: UsuariosFormNovoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
