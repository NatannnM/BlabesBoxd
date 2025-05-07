import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/module.d-CnjH8Dlt';
import { FilmesPage } from './filmes.page';



@NgModule({
  declarations: [FilmesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   //GamesPageRoutingModule,
    //MaskitoDirective,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class FilmesModule { }
