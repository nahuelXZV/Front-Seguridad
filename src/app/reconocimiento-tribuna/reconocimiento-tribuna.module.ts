import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconocimientoTribunaRoutingModule } from './reconocimiento-tribuna-routing.module';
import { SeguridadTribunaComponent } from './pages/seguridad-tribuna/seguridad-tribuna.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SeguridadTribunaComponent
  ],
  imports: [
    CommonModule,
    ReconocimientoTribunaRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ReconocimientoTribunaModule { }
