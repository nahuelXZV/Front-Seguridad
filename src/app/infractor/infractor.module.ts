import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { SharedModule } from '../shared/shared.module';
import { InfractorRoutingModule } from './infractor-routing.module';
import { InfractorPageComponent } from './pages/infractor-page/infractor-page.component';
import { InfractoresComponent } from './pages/infractores/infractores.component';
import { CreateInfractorComponent } from './pages/create-infractor/create-infractor.component';
import { UpdateInfractorComponent } from './pages/update-infractor/update-infractor.component';
import { ViewInfractorComponent } from './pages/view-infractor/view-infractor.component';


@NgModule({
  declarations: [
    InfractorPageComponent,
    InfractoresComponent,
    CreateInfractorComponent,
    UpdateInfractorComponent,
    ViewInfractorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    InfractorRoutingModule,

  ]
})
export class InfractorModule { }
