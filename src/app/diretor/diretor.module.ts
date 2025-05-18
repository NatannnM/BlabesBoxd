import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiretorPageRoutingModule } from './diretor-routing.module';

import { DiretorPage } from './diretor.page';

import { MaskitoDirective } from '@maskito/angular';
import { DiretorFormComponent } from './diretor-form/diretor-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiretorPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DiretorPage, DiretorFormComponent]
})
export class DiretorPageModule {}
