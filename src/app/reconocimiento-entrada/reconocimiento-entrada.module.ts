import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradaRoutingModule } from './entrada-routing.module';
import { SeguridadEntradaComponent } from './pages/seguridad-entrada/seguridad-entrada.component';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SeguridadEntradaComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    EntradaRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ReconocimientoEntradaModule { }
