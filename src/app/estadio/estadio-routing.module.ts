import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';

import { EstadioPageComponent } from './pages/estadio-page/estadio-page.component';
import { EstadiosComponent } from './pages/estadios/estadios.component';

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
