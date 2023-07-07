import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';

import { EstadioPageComponent } from './pages/estadio-page/estadio-page.component';
import { EstadiosComponent } from './pages/estadios/estadios.component';
import { CreateEstadioComponent } from './pages/create-estadio/create-estadio.component';
import { UpdateEstadioComponent } from './pages/update-estadio/update-estadio.component';

const routes: Routes = [
  {
    path: '',
    component: EstadioPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: EstadiosComponent,
      },
      {
        path: 'create',
        component: CreateEstadioComponent,
        data: { name: 'create-estadio' },
      },
      {
        path: 'edit/:id',
        component: UpdateEstadioComponent,
        data: { name: 'update-estadio' },
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
export class EstadioRoutingModule { }
