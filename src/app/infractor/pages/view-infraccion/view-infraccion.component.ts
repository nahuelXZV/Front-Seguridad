import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfraccionService } from '../../services/infraccion.service';
import { Documento } from '../../interfaces/documento.interface';
import { Sansion } from '../../interfaces/sansion.interface';
import { Testigo } from 'src/app/testigos/interfaces/testigo.interface';

@Component({
  selector: 'app-view-infraccion',
  templateUrl: './view-infraccion.component.html',
  styleUrls: ['./view-infraccion.component.css']
})
//sancion
//testigos
//documentos
export class ViewInfraccionComponent implements OnInit {

  infraccionId!: string;
  public readonly: boolean = true;
  public readonlyDocumento: boolean = true;
  public readonlySancion: boolean = true;
  public datosinfraccionForm: any;
  public documentos: Documento[] = [];
  public sancion?: Sansion ;
  public testigos: Testigo[] = [];
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

  constructor(
    private infraccionService: InfraccionService,
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
      this.infraccionId = id;
      this.loadInfraccion(this.infraccionId);
    } else {
      // Manejar el caso en el que el ID es nulo
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
          estadio: infraccion.estadio.nombre,
          estado: infraccion.estado,
          descripcion: infraccion.descripcion,
        });
        this.testigos = infraccion.testigos;
        this.documentos = infraccion.documentos;
        this.sancion = infraccion.sansion;


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
    this.infraccionService.update(this.infraccionId, infraccion).subscribe(infraccion => {
      if (!infraccion) return this.showSnackbar('Error al actualizar infraccion, intente nuevamente');
      // this.router.navigate(['/infracciones/list']);
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

}
