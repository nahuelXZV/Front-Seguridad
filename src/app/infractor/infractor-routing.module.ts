import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { InfractorPageComponent } from './pages/infractor-page/infractor-page.component';
import { InfractoresComponent } from './pages/infractores/infractores.component';
import { CreateInfractorComponent } from './pages/create-infractor/create-infractor.component';
import { ViewInfractorComponent } from './pages/view-infractor/view-infractor.component';
import { CreateInfraccionComponent } from './pages/create-infraccion/create-infraccion.component';
import { ViewInfraccionComponent } from './pages/view-infraccion/view-infraccion.component';
import { CreateTestigoComponent } from './pages/create-testigo/create-testigo.component';

const routes: Routes = [
  {
    path: '',
    component: InfractorPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: InfractoresComponent,
      },
      {
        path: 'create',
        component: CreateInfractorComponent,
        data: { name: 'create-infractor' },
      },
      {
        path: 'view/:id',
        component: ViewInfractorComponent,
        data: { name: 'view-infractor' },
      },
      {
        path: '**',
        redirectTo: '404'
      },
      {
        path: 'create-infraccion/:id',
        component: CreateInfraccionComponent,
        data: { name: 'create-infraccion' },
      },
      {
        path: 'view-infraccion/:id',
        component: ViewInfraccionComponent,
        data: { name: 'view-infraccion' },
      },
      {
        path: 'infraccion-create-testigo/:id',
        component: CreateTestigoComponent,
        data: { name: 'create-infraccion' },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfractorRoutingModule { }
