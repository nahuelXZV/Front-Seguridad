import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InfractorService } from '../../services/infractor.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { InfractorReq } from '../../interfaces/infractorReq.interface';

@Component({
  selector: 'app-create-infractor',
  templateUrl: './create-infractor.component.html',
  styleUrls: ['./create-infractor.component.css']
})
export class CreateInfractorComponent implements OnInit {

  public sexos : string[] = ['masculino', 'femenino', 'otro'];
  sexoSelected = 'masculino';

  public infractorForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1)]],
    apellido: ['', [Validators.required, Validators.minLength(1)]],
    cedulaIdentidad: ['', [Validators.required, Validators.minLength(1)]],
    nacionalidad: ['', [Validators.required, Validators.minLength(1)]],
    fechaNacimiento: ['', [Validators.required, Validators.minLength(1)]],
    sexo: ['', [Validators.required, Validators.minLength(1)]],
    otros: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private infractorService: InfractorService,
    private validatorService: ValidatorsService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }


  onSubmit() {
    if (this.infractorForm.invalid) {
      this.infractorForm.markAllAsTouched();
      return;
    }

    let infractorReq : InfractorReq = {
      nombre : this.infractorForm.value.nombre,
      apellido: this.infractorForm.value.apellido,
      cedulaIdentidad: this.infractorForm.value.cedulaIdentidad,
      nacionalidad: this.infractorForm.value.nacionalidad,
      fechaNacimiento: this.infractorForm.value.fechaNacimiento,
      sexo: this.sexoSelected,
      otros:  this.infractorForm.value.otros,
      huellas: [],
    }

    this.infractorService.create(infractorReq).subscribe(infractor => {
      if (!infractor) return this.showSnackbar('Error al crear infractor, intente nuevamente');

      this.router.navigate(['/infractores/list']);
      this.showSnackbar('Infractor creado');
    });

  }

  cancelar(): void {
    this.router.navigate(['/infractores/list']);
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Entendido!', {
      duration: 2500,
    });
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.infractorForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.infractorForm, field);
  }

}
