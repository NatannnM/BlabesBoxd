import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmesPageRoutingModule } from './filmes-routing.module';

import { FilmesPage } from './filmes.page';
import { FilmesFormComponent } from './filmes-form/filmes-form.component';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmesPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FilmesPage,
    FilmesFormComponent,
  ]  
})
export class FilmesPageModule {}
