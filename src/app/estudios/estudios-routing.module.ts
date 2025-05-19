import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiosPage } from './estudios.page';
import { EstudiosFormComponent } from './estudios-form/estudios-form.component';
import { EstudiosDetailsComponent } from './estudios-details/estudios-details.component';

const routes: Routes = [
  {
    path: '',
    component: EstudiosPage
  },
  {
    path: 'new',
    component: EstudiosFormComponent
  },
  {
    path: 'edit/:estudiosId',
    component: EstudiosFormComponent
  },
  {
    path: 'details/:estudiosId',
    component: EstudiosDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiosPageRoutingModule { }
