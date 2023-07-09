import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadTribunaComponent } from './pages/seguridad-tribuna/seguridad-tribuna.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { LayoutComponent } from '../reconocimiento-entrada/pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'show',
        component: SeguridadTribunaComponent,
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
export class ReconocimientoTribunaRoutingModule { }
