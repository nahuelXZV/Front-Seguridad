import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { ListAlertaComponent } from './pages/list-alerta/list-alerta.component';
import { ShowAlertaComponent } from './pages/show-alerta/show-alerta.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: ListAlertaComponent,
      },
      {
        path: 'show/:id',
        component: ShowAlertaComponent,
        data: { name: 'show-estadio' },
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
export class AlertaRoutingModule { }
