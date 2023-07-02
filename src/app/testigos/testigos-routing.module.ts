import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestigosPageComponent } from './pages/testigos-page/testigos-page.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { TestigosComponent } from './pages/testigos/testigos.component';
import { CreateTestigoComponent } from './pages/create-testigo/create-testigo.component';
import { UpdateTestigoComponent } from './pages/update-testigo/update-testigo.component';

const routes: Routes = [
  {
    path: '',
    component: TestigosPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: TestigosComponent,
        data: { name: 'home' },
      },
      {
        path: 'create',
        component: CreateTestigoComponent,
        data: { name: 'home' },
      },
      {
        path: 'edit/:id',
        component: UpdateTestigoComponent,
        data: { name: 'home' },
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
export class TestigosRoutingModule { }
