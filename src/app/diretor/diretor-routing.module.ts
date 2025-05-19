import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiretorPage } from './diretor.page';
import { DiretorFormComponent } from './diretor-form/diretor-form.component';
import { DiretorDetailsComponent } from './diretor-details/diretor-details.component';

const routes: Routes = [
  {
    path: '',
    component: DiretorPage
  }, 
  {
    path: 'new',
    component: DiretorFormComponent
  },
  {
    path: 'edit/:diretorId',
    component: DiretorFormComponent
  },
  {
    path: ':diretorId',
    component: DiretorDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiretorPageRoutingModule { }
