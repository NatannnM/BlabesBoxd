import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmesPage } from './filmes.page';
import { FilmesFormComponent } from './filmes-form/filmes-form.component';
import { FilmesDetailsComponent } from './filmes-details/filmes-details.component';
import { AssistidoPage } from './assistido/assistido.page';

const routes: Routes = [
  {
    path: '',
    component: FilmesPage
  },
  {
    path: 'new',
    component: FilmesFormComponent
  },
  {
    path: 'edit/:filmesId',
    component: FilmesFormComponent
  },
  {
    path: 'assistido/:filmesId',
    component: AssistidoPage
  },

  {
    path: ':filmesId',
    component: FilmesDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmesPageRoutingModule {}
