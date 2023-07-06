import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstadioService } from '../../services/estadio.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'estadio-create-estadio',
  templateUrl: './create-estadio.component.html'
})
export class CreateEstadioComponent implements OnInit {

  public estadioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    departamento: ['', [Validators.required, Validators.minLength(5)]],
    ciudad: ['', [Validators.required, Validators.minLength(5)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private estadioService: EstadioService,
    private validatorService: ValidatorsService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.estadioForm.invalid) {
      this.estadioForm.markAllAsTouched();
      return;
    }
    const estadio = this.estadioForm.value;
    this.estadioService.create(estadio).subscribe(estadio => {
      if (!estadio) return this.showSnackbar('Error al crear estadio, intente nuevamente');
      this.router.navigate(['/estadios/list']);
      this.showSnackbar('Estadio creado');
    });
  }

  cancelar(): void {
    this.router.navigate(['/estadios/list']);
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Entendido!', {
      duration: 2500,
    });
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.estadioForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.estadioForm, field);
  }

}
