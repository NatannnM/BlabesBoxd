import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistidoPage } from './assistido.page';

const routes: Routes = [
  {
    path: '',
    component: AssistidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistidoPageRoutingModule {}
