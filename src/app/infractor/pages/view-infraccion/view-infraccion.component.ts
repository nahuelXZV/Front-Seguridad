import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfraccionService } from '../../services/infraccion.service';
import { Documento } from '../../interfaces/documento.interface';
import { Sansion } from '../../interfaces/sansion.interface';
import { Testigo } from 'src/app/testigos/interfaces/testigo.interface';
import { EstadioService } from 'src/app/estadio/services/estadio.service';
import { Estadio } from 'src/app/testigos/interfaces/infraccion.interface';
import { catchError, throwError } from 'rxjs';
import { DocumentoService } from '../../services/documento.service';
import { SansionService } from '../../services/sansion.service';

@Component({
  selector: 'app-view-infraccion',
  templateUrl: './view-infraccion.component.html',
  styleUrls: ['./view-infraccion.component.css']
})
export class ViewInfraccionComponent implements OnInit {

  infraccionId!: string;
  public readonly: boolean = true;
  public readonlyDocumento: boolean = true;
  public readonlySancion: boolean = true;
  public showFormSancion: boolean = false;
  public datosinfraccionForm: any;
  public documentos: Documento[] = [];
  public sancion?: Sansion;
  public testigos: Testigo[] = [];
  public estadios!: Estadio[];
  public estadioName!: string;
  public infraccionForm: FormGroup = this.fb.group({
    fecha: ['', [Validators.required, Validators.minLength(1)]],
    hora: ['', [Validators.required, Validators.minLength(1)]],
    seccion: ['', [Validators.required, Validators.minLength(1)]],
    fila: ['', [Validators.required, Validators.minLength(1)]],
    asiento: ['', [Validators.required, Validators.minLength(1)]],
    creador: ['', [Validators.required, Validators.minLength(1)]],
    estadio: ['', [Validators.required, Validators.minLength(1)]],
    estado: ['', [Validators.required, Validators.minLength(1)]],
    descripcion: ['', [Validators.required, Validators.minLength(1)]],
  });

  public sancionForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1)]],
    tiempo: ['', [Validators.required, Validators.minLength(1)]],
    estado: ['', [Validators.required, Validators.minLength(1)]],
    fechaInicio: ['', [Validators.required, Validators.minLength(1)]],
    descripcion: ['', [Validators.required, Validators.minLength(1)]],
  });

  public documentoForm: FormGroup = this.fb.group({
    doc: this.fb.array([]),
  });

  constructor(
    private infraccionService: InfraccionService,
    private validatorService: ValidatorsService,
    private estadioService: EstadioService,
    private documentoService: DocumentoService,
    private sancionService: SansionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.readonly = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.infraccionId = id;
      this.loadInfraccion(this.infraccionId);
    } else {
      console.log('error');
    }
  }

  loadInfraccion(id: string): void {
    this.infraccionService.getById(id).subscribe(infraccion => {
      if (infraccion !== null && infraccion !== undefined) {
        this.infraccionForm.patchValue({
          fecha: infraccion.fecha,
          hora: infraccion.hora,
          seccion: infraccion.seccion,
          fila: infraccion.fila,
          asiento: infraccion.asiento,
          creador: infraccion.creador.nombre + " " + infraccion.creador.apellido,
          estadio: infraccion.estadio.id,
          estado: infraccion.estado,
          descripcion: infraccion.descripcion,
        });
        this.estadioName = infraccion.estadio.nombre;
        this.testigos = infraccion.testigos;
        this.documentos = infraccion.documentos;
        this.sancion = infraccion.sansion;
        this.sancion ? this.showFormSancion = true : this.showFormSancion = false;
        if (this.showFormSancion && this.sancion !== undefined) {
          this.sancionForm.patchValue({
            nombre: this.sancion.nombre,
            tiempo: this.sancion.tiempo,
            estado: this.sancion.estado,
            fechaInicio: this.sancion.fechaInicio,
            descripcion: this.sancion.descripcion,
          });
        }

        this.loadEstadios();
      } else {
        // Manejar el caso en el que el infraccion no exista
      }
    });
  }

  loadEstadios(): void {
    this.estadioService.getAll().subscribe(estadios => {
      if (estadios !== null && estadios !== undefined) {
        this.estadios = estadios;
      } else {
        // Manejar el caso en el que el infraccion no exista
      }
    });
  }

  onSubmit() {
    if (this.infraccionForm.invalid) {
      this.infraccionForm.markAllAsTouched();
      return;
    }
    const infraccion = this.infraccionForm.value;
    const { creador, ...rest } = infraccion;
    this.infraccionService.update(this.infraccionId, rest)
      .pipe(
        catchError(err => {
          this.showSnackbar('Error al actualizar infraccion, intente nuevamente');
          return throwError(err);
        }),
      ).subscribe(infraccion => {
        if (!infraccion) return this.showSnackbar('Error al actualizar infraccion, intente nuevamente');
        this.readonly = true;
        this.loadInfraccion(this.infraccionId);
        this.showSnackbar('infraccion actualizado');
      });
  }

  editar(): void {
    this.datosinfraccionForm = this.infraccionForm.value;
    this.readonly = false;
  }

  cancelar(): void {
    this.infraccionForm.patchValue(this.datosinfraccionForm);
    this.readonly = true;
  }


  uploadFile() {
    this.readonlyDocumento = false;
  }

  saveFile() {
    this.documentoService.create(this.documentoForm.value.doc, { infraccion: this.infraccionId, descripcion: "Sin descripcion" }).subscribe(foto => {
      if (!foto) return this.showSnackbar('Error al subir el documento, intente nuevamente');
      this.readonlyDocumento = true;
      this.loadInfraccion(this.infraccionId);
      this.showSnackbar('Documento subido');
    });
  }

  cancelarUpload() {
    this.readonlyDocumento = true;
    this.documentoForm.reset();
  }

  onFilesChange(event: any) {
    const formArray = this.documentoForm.get('doc') as FormArray;
    formArray.clear();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formArray.push(new FormControl(file));
    }
  }

  createSancion() {
    this.readonlySancion = false;
    this.showFormSancion = false;
    this.sancionService.create({ ...this.sancionForm.value, infraccion: this.infraccionId }).subscribe(sancion => {
      if (!sancion) return this.showSnackbar('Error al crear sancion, intente nuevamente');
      this.loadInfraccion(this.infraccionId);
      this.showSnackbar('Sancion creada');
    });

  }

  editarSancion() {
    this.readonlySancion = false;
  }

  cancelarSansion() {
    this.readonlySancion = true;
  }


  onSubmitSancion() { }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Entendido!', {
      duration: 2500,
    });
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.infraccionForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.infraccionForm, field);
  }

  isValidFieldSancion(field: string): boolean | null {
    return this.validatorService.isValidField(this.sancionForm, field);
  }

  getFieldErrorSancion(field: string): string | null {
    return this.validatorService.getFieldError(this.sancionForm, field);
  }

}
