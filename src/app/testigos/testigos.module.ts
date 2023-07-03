import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestigosRoutingModule } from './testigos-routing.module';
import { TestigosComponent } from './pages/testigos/testigos.component';
import { TestigosPageComponent } from './pages/testigos-page/testigos-page.component';
import { CreateTestigoComponent } from './pages/create-testigo/create-testigo.component';
import { UpdateTestigoComponent } from './pages/update-testigo/update-testigo.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    TestigosComponent,
    TestigosPageComponent,
    CreateTestigoComponent,
    UpdateTestigoComponent
  ],
  imports: [
    CommonModule,
    TestigosRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ]
})
export class TestigosModule { }
