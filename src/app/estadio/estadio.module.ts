
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { EstadioRoutingModule } from './estadio-routing.module';
import { EstadioPageComponent } from './pages/estadio-page/estadio-page.component';
import { EstadiosComponent } from './pages/estadios/estadios.component';


@NgModule({
  declarations: [
    EstadioPageComponent,
    EstadiosComponent
  ],

  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    EstadioRoutingModule
  ],

})
export class EstadioModule { }
