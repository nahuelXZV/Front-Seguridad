import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './pages/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UsersPageComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule
  ]
})
export class UsersModule { }
