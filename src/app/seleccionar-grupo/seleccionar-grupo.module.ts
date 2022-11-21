import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarGrupoPageRoutingModule } from './seleccionar-grupo-routing.module';

import { SeleccionarGrupoPage } from './seleccionar-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarGrupoPageRoutingModule
  ],
  declarations: [SeleccionarGrupoPage]
})
export class SeleccionarGrupoPageModule {}
