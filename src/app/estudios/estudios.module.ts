import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiosPageRoutingModule } from './estudios-routing.module';

import { EstudiosPage } from './estudios.page';
import { EstudiosFormComponent } from './estudios-form/estudios-form.component';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    EstudiosPageRoutingModule
  ],
  declarations: [EstudiosPage,EstudiosFormComponent]
})
export class EstudiosPageModule {}
