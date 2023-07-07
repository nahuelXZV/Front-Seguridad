import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { EstadioRoutingModule } from './estadio-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EstadioPageComponent } from './pages/estadio-page/estadio-page.component';
import { EstadiosComponent } from './pages/estadios/estadios.component';
import { CreateEstadioComponent } from './pages/create-estadio/create-estadio.component';
import { UpdateEstadioComponent } from './pages/update-estadio/update-estadio.component';


@NgModule({
  declarations: [
    EstadioPageComponent,
    EstadiosComponent,
    CreateEstadioComponent,
    UpdateEstadioComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EstadioRoutingModule,
    SharedModule,

  ],

})
export class EstadioModule { }
