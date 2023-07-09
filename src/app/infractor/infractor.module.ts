import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { SharedModule } from '../shared/shared.module';
import { InfractorRoutingModule } from './infractor-routing.module';
import { InfractorPageComponent } from './pages/infractor-page/infractor-page.component';
import { InfractoresComponent } from './pages/infractores/infractores.component';
import { CreateInfractorComponent } from './pages/create-infractor/create-infractor.component';
import { ViewInfractorComponent } from './pages/view-infractor/view-infractor.component';
import { ListInfraccionesComponent } from './components/list-infracciones/list-infracciones.component';
import { CreateInfraccionComponent } from './pages/create-infraccion/create-infraccion.component';
import { ViewInfraccionComponent } from './pages/view-infraccion/view-infraccion.component';
import { ListTestigosComponent } from './components/list-testigos/list-testigos.component';
import { CreateTestigoComponent } from './pages/create-testigo/create-testigo.component';

@NgModule({
  declarations: [
    InfractorPageComponent,
    InfractoresComponent,
    CreateInfractorComponent,
    ViewInfractorComponent,
    ListInfraccionesComponent,
    CreateInfraccionComponent,
    ViewInfraccionComponent,
    ListTestigosComponent,
    CreateTestigoComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    InfractorRoutingModule
    
  ],

})
export class InfractorModule { }
