import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { InfractorService } from '../../services/infractor.service';
// import { MatCarouselModule } from '@ngbmodule/material-carousel';


@Component({
  selector: 'app-view-infractor',
  templateUrl: './view-infractor.component.html',
  styleUrls: ['./view-infractor.component.css']
})
export class ViewInfractorComponent implements OnInit {

  id!: string;
  public readonly: boolean = true;
  public datosInfractorForm: any;
  public infractorForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1)]],
    apellido: ['', [Validators.required, Validators.minLength(1)]],
    cedulaIdentidad: ['', [Validators.required, Validators.minLength(5)]],
    nacionalidad: ['', [Validators.required, Validators.minLength(3)]],
    fechaNacimiento: ['', [Validators.required, Validators.minLength(3)]],
    sexo: ['', [Validators.required, Validators.minLength(3)]],
    otros: ['Ninguno', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private infractorService: InfractorService,
    private validatorService: ValidatorsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.readonly = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.loadInfractor(this.id);
    } else {
      // Manejar el caso en el que el ID es nulo
      console.log('error');
    }
  }

  loadInfractor(id: string): void {
    this.infractorService.getById(id).subscribe(infractor => {
      if (infractor !== null && infractor !== undefined) {
        this.infractorForm.patchValue({
          nombre: infractor.nombre,
          apellido: infractor.apellido,
          cedulaIdentidad: infractor.cedulaIdentidad,
          nacionalidad: infractor.nacionalidad,
          fechaNacimiento: infractor.fechaNacimiento,
          sexo: infractor.sexo,
          otros: infractor.otros,
        });
      } else {
        // Manejar el caso en el que el infractor no exista
      }
    });
  }

  onSubmit() {
    if (this.infractorForm.invalid) {
      this.infractorForm.markAllAsTouched();
      return;
    }
    const infractor = this.infractorForm.value;
    this.infractorService.update(this.id, infractor).subscribe(infractor => {
      if (!infractor) return this.showSnackbar('Error al actualizar infractor, intente nuevamente');
      this.router.navigate(['/infractores/list']);
      this.showSnackbar('infractor actualizado');
    });
  }

  editar(): void {
    this.datosInfractorForm = this.infractorForm.value;
    this.readonly = false;
  }

  cancelar(): void {
    this.infractorForm.patchValue(this.datosInfractorForm);
    this.readonly = true;
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
