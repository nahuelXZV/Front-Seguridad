import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertaRoutingModule } from './alerta-routing.module';
import { ShowAlertaComponent } from './pages/show-alerta/show-alerta.component';
import { ListAlertaComponent } from './pages/list-alerta/list-alerta.component';


@NgModule({
  declarations: [
    ShowAlertaComponent,
    ListAlertaComponent
  ],
  imports: [
    CommonModule,
    AlertaRoutingModule
  ]
})
export class AlertaModule { }
