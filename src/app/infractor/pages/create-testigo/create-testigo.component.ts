import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { TestigosService } from 'src/app/testigos/services/testigos.service';
import { TestigoReq } from '../../interfaces/testigoReq.interface';

@Component({
  selector: 'app-create-testigo',
  templateUrl: './create-testigo.component.html',
  styleUrls: ['./create-testigo.component.css']
})
export class CreateTestigoComponent implements OnInit {

  public sexos : string[] = ['masculino', 'femenino', 'otro'];
  sexoSelected = 'masculino';
  infraccionId!: string;
  public testigoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1)]],
    apellido: ['', [Validators.required, Validators.minLength(1)]],
    telefono: ['', [Validators.required, Validators.minLength(1)]],
    cedulaIdentidad: ['', [Validators.required, Validators.minLength(1)]],
    nacionalidad: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private testigosService: TestigosService,
    private validatorService: ValidatorsService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.infraccionId = id;
    } else {
      // Manejar el caso en el que el ID es nulo
      console.log('error');
    }

  }


  onSubmit() {
    if (this.testigoForm.invalid) {
      this.testigoForm.markAllAsTouched();
      return;
    }

    let testigoReq : TestigoReq = {
      nombre : this.testigoForm.value.nombre,
      apellido: this.testigoForm.value.apellido,
      telefono: this.testigoForm.value.telefono,
      cedulaIdentidad: this.testigoForm.value.cedulaIdentidad,
      nacionalidad: this.testigoForm.value.nacionalidad,
      sexo: this.sexoSelected,
      infraccion:  this.infraccionId,
    }

    this.testigosService.createTestigo(testigoReq).subscribe(testigo => {
      if (!testigo) return this.showSnackbar('Error al crear testigo, intente nuevamente');

      this.router.navigate(['/infractores/view-infraccion', this.infraccionId]);
      this.showSnackbar('testigo creado');
    });

  }

  cancelar(): void {
    this.router.navigate(['/infractores/view-infraccion', this.infraccionId]);
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Entendido!', {
      duration: 2500,
    });
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.testigoForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.testigoForm, field);
  }

}
