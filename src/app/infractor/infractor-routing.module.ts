import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { InfractorPageComponent } from './pages/infractor-page/infractor-page.component';
import { InfractoresComponent } from './pages/infractores/infractores.component';

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
