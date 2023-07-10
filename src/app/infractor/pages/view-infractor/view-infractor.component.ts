import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { InfractorService } from '../../services/infractor.service';
import { Foto } from '../../interfaces/foto.interface';
import { Infraccion } from '../../interfaces/infraccion.interface';
import { FotoService } from '../../services/foto.service';

@Component({
  selector: 'app-view-infractor',
  templateUrl: './view-infractor.component.html',
  styleUrls: ['./view-infractor.component.css']
})
export class ViewInfractorComponent implements OnInit {

  id!: string;
  public sexos: string[] = ['masculino', 'femenino', 'otro'];
  sexoSelected = '';
  public readonly: boolean = true;
  public readonlyFoto: boolean = true;
  public datosInfractorForm: any;
  public fotos: Foto[] = [];
  public infracciones: Infraccion[] = [];
  public infractorForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1)]],
    apellido: ['', [Validators.required, Validators.minLength(1)]],
    cedulaIdentidad: ['', [Validators.required, Validators.minLength(5)]],
    nacionalidad: ['', [Validators.required, Validators.minLength(3)]],
    fechaNacimiento: ['', [Validators.required, Validators.minLength(3)]],
    sexo: ['', [Validators.required, Validators.minLength(3)]],
    otros: ['Ninguno', [Validators.required, Validators.minLength(3)]],
  });

  public fotosForm: FormGroup = this.fb.group({
    foto: this.fb.array([]),
  });

  constructor(
    private infractorService: InfractorService,
    private validatorService: ValidatorsService,
    private fotoService: FotoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.readonly = true;
    this.readonlyFoto = true;
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
        this.infracciones = infractor.infracciones;
        this.fotos = infractor.fotos;
        this.sexoSelected = infractor.sexo;
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
      this.readonly = true;
      this.loadInfractor(this.id);
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

  uploadFile() {
    this.readonlyFoto = false;
  }

  saveFile() {
    // console.log(this.fotosForm.value.foto);
    this.fotoService.create(this.fotosForm.value.foto, this.id,).subscribe(foto => {
      if (!foto) return this.showSnackbar('Error al actualizar foto, intente nuevamente');
      this.readonlyFoto = true;
      this.loadInfractor(this.id);
      this.showSnackbar('Foto actualizada');
    });
  }

  cancelarUpload() {
    this.readonlyFoto = true;
    this.fotosForm.reset();
  }

  onFilesChange(event: any) {
    const formArray = this.fotosForm.get('foto') as FormArray;
    formArray.clear();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formArray.push(new FormControl(file));
    }
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
