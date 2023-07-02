import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestigosService } from '../../services/testigos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Testigo } from '../../interfaces/testigo.interface';
import { catchError, of, tap } from 'rxjs';
import { Register } from '../../interfaces/register.interface';
import { Infraccion } from '../../interfaces/infraccion.interface';

@Component({
  selector: 'app-create-testigo',
  templateUrl: './create-testigo.component.html',
  styleUrls: ['./create-testigo.component.css']
})
export class CreateTestigoComponent implements OnInit {
  createForm: FormGroup;
  sexos: string[] = ['femenino', 'masculino', 'otro'];
  infracciones: Infraccion[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private testigoService: TestigosService,
    private router: Router,
    private snackbar: MatSnackBar,
    ) {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      cedulaIdentidad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      sexo: ['', Validators.required],
      infraccion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      cedulaIdentidad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      sexo: ['', Validators.required],
      infraccion: ['', Validators.required],
    });

    this.testigoService.getInfracciones().subscribe(
      (infracciones: Infraccion[]) => {
        this.infracciones = infracciones;
      },
      (error) => {
        console.log('Error al obtener las infracciones:', error);
      }
    );
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      console.log('invalid')
      return;
    }

    const {nombre, apellido, telefono, cedulaIdentidad, nacionalidad, sexo, infraccion} = this.createForm.value;
    this.register({nombre, apellido, telefono, cedulaIdentidad, nacionalidad, sexo, infraccion});

  }

  register(testigo: Register){
    console.log(testigo);
    this.testigoService.createTestigo(testigo)
      .pipe(
        tap(resp => console.log(resp)),
        catchError(err => of(
          this.showSnackbar(err.error.message, 'Cerrar')
        ))
      ).subscribe(() => {
        this.router.navigate(['testigos']);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
      });
  }

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
