import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { InfractorRoutingModule } from './infractor-routing.module';
import { InfractorPageComponent } from './pages/infractor-page/infractor-page.component';
import { InfractoresComponent } from './pages/infractores/infractores.component';


@NgModule({
  declarations: [
    InfractorPageComponent,
    InfractoresComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    InfractorRoutingModule,
  ]
})
export class InfractorModule { }
