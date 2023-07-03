import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { Register } from 'src/app/auth/interfaces/register.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createForm: FormGroup;
  roles: string[] = ['administrador', 'guardia', 'funcionario'];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar,
    ) {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      console.log('invalid')
      return;
    }

    const {nombre, apellido, email, password, role} = this.createForm.value;
    this.register({nombre, apellido, email, password, role});

  }

  register(user: Register){
    console.log(user);
    this.userService.createUser(user)
      .pipe(
        tap(resp => console.log(resp)),
        catchError(err => of(
          this.showSnackbar(err.error.message, 'Cerrar')
        ))
      ).subscribe(() => {
        this.router.navigate(['users']);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
      }); 
  }

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
