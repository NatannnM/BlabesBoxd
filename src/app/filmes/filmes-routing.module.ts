import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmesPage } from './filmes.page';
import { FilmesFormComponent } from './filmes-form/filmes-form.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmesPageRoutingModule {}
