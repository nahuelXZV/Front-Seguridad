import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { InfractorPageComponent } from './pages/infractor-page/infractor-page.component';
import { InfractoresComponent } from './pages/infractores/infractores.component';
import { CreateInfractorComponent } from './pages/create-infractor/create-infractor.component';
import { UpdateInfractorComponent } from './pages/update-infractor/update-infractor.component';
import { ViewInfractorComponent } from './pages/view-infractor/view-infractor.component';

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
        path: 'edit/:id',
        component: UpdateInfractorComponent,
        data: { name: 'update-infractor' },
      },
      {
        path: 'view/:id',
        component: ViewInfractorComponent,
        data: { name: 'view-infractor' },
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfractorRoutingModule { }
