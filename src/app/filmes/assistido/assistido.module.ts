import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistidoPageRoutingModule } from './assistido-routing.module';

import { AssistidoPage } from './assistido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistidoPageRoutingModule
  ],
  declarations: [AssistidoPage]
})
export class AssistidoPageModule {}
