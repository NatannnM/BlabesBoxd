import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { MaskitoDirective } from '@maskito/angular';
import { UsuariosFormNovoComponent } from './usuarios-form-novo/usuarios-form-novo.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    UsuariosPage,
    UsuariosFormComponent,
    UsuariosFormNovoComponent
  ]
})
export class UsuariosPageModule {}
