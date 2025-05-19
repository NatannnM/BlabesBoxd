import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MaskitoDirective } from '@maskito/angular';

import { EstudiosPageRoutingModule } from './estudios-routing.module';
import { EstudiosPage } from './estudios.page';
import { EstudiosFormComponent } from './estudios-form/estudios-form.component';
import { EstudiosDetailsComponent } from './estudios-details/estudios-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    MaskitoDirective,
    EstudiosPageRoutingModule,
    EstudiosDetailsComponent
  ],
  declarations: [
    EstudiosPage,
    EstudiosFormComponent
  ]
})
export class EstudiosPageModule { }
