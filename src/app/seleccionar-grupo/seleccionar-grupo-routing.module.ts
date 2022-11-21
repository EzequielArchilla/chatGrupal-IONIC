import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarGrupoPage } from './seleccionar-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarGrupoPageRoutingModule {}
