import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EstadioService } from '../../services/estadio.service';

@Component({
  selector: 'estadio-update-estadio',
  templateUrl: './update-estadio.component.html'
})
export class UpdateEstadioComponent implements OnInit {

  id!: string;
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
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.loadEstadio(this.id);
    } else {
      // Manejar el caso en el que el ID es nulo
      console.log('error');
    }
  }

  loadEstadio(id: string): void {
    this.estadioService.getById(id).subscribe(estadio => {
      if (estadio !== null && estadio !== undefined) {
        this.estadioForm.patchValue({
          nombre: estadio.nombre,
          departamento: estadio.departamento,
          ciudad: estadio.ciudad,
          direccion: estadio.direccion,
        });
      } else {
        // Manejar el caso en el que el estadio no exista
      }
    });
  }

  onSubmit() {
    if (this.estadioForm.invalid) {
      this.estadioForm.markAllAsTouched();
      return;
    }
    const estadio = this.estadioForm.value;
    this.estadioService.update(this.id, estadio).subscribe(estadio => {
      if (!estadio) return this.showSnackbar('Error al actualizar estadio, intente nuevamente');
      this.router.navigate(['/estadios/list']);
      this.showSnackbar('Estadio actualizado');
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
