import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: UsersComponent,
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
export class UsersRoutingModule { }
