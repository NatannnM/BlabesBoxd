import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiretorPageRoutingModule } from './diretor-routing.module';

import { DiretorPage } from './diretor.page';
import { DiretorFormComponent } from './diretor-form/diretor-form.component';
import { DiretorDetailsComponent } from './diretor-details/diretor-details.component';

import { MaskitoDirective } from '@maskito/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiretorPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    DiretorPage, 
    DiretorFormComponent
  ]
})
export class DiretorPageModule {}
