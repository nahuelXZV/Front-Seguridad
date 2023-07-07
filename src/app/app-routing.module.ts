import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "home",
    loadChildren: () => import("./shared/shared.module").then(m => m.SharedModule)
  },
  {
    path: "users",
    loadChildren: () => import("./users/users.module").then(m => m.UsersModule),
  },
  {
    path: "testigos",
    loadChildren: () => import("./testigos/testigos.module").then(m => m.TestigosModule),
  },
  {
    path: "estadios",
    loadChildren: () => import("./estadio/estadio.module").then(m => m.EstadioModule),
    data: { name: 'estadios' }
  },
  {
    path: "infractores",
    loadChildren: () => import("./infractor/infractor.module").then(m => m.InfractorModule),
    data: { name: 'infractores' }
  },
  {
    path: "reconocimiento-entrada",
    loadChildren: () => import("./reconocimiento-entrada/reconocimiento-entrada.module").then(m => m.ReconocimientoEntradaModule),
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
