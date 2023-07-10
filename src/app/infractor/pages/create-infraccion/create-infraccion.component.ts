import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfraccionService } from '../../services/infraccion.service';
import { Estadio } from 'src/app/estadio/interfaces/estadio.interface';
import { EstadioService } from 'src/app/estadio/services/estadio.service';


@Component({
  selector: 'app-create-infraccion',
  templateUrl: './create-infraccion.component.html',
  styleUrls: ['./create-infraccion.component.css']
})
export class CreateInfraccionComponent implements OnInit {

  estadioIdSelected = '';
  infractorId!: string;
  userAdmin!: string;
  public estadios: Estadio[] = [];
  public infraccionForm: FormGroup = this.fb.group({
    fecha: ['', [Validators.required, Validators.minLength(1)]],
    hora: ['', [Validators.required, Validators.minLength(1)]],
    seccion: ['', [Validators.required, Validators.minLength(1)]],
    fila: ['', [Validators.required, Validators.minLength(1)]],
    asiento: ['', [Validators.required, Validators.minLength(1)]],
    descripcion: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private infraccionService: InfraccionService,
    private estadioService: EstadioService,
    private validatorService: ValidatorsService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.infractorId = id;
    } else {
      // Manejar el caso en el que el ID es nulo
      console.log('error');
    }
    this.loadEstadios();

    const user = localStorage.getItem('user');
    if (user) {
      const { id } = JSON.parse(user);
      this.userAdmin = id;
    }
  }

  loadEstadios(): void {
    this.estadioService.getAll().subscribe(estadios => {
      if (!estadios) return this.showSnackbar('Error al obtener infraccion, intente nuevamente');
      this.estadios = estadios;
      this.estadioIdSelected = estadios[0].id;
    });
  }

  onSubmit() {
    if (this.infraccionForm.invalid) {
      this.infraccionForm.markAllAsTouched();
      return;
    }

    let infraccion = {
      fecha: this.infraccionForm.value.fecha,
      hora: this.infraccionForm.value.hora,
      seccion: this.infraccionForm.value.seccion,
      fila: this.infraccionForm.value.fila,
      asiento: this.infraccionForm.value.asiento,
      descripcion: this.infraccionForm.value.descripcion,
      estado: "Pendiente",
      infractor: this.infractorId,
      creador: this.userAdmin,
      estadio: this.estadioIdSelected,
    };
    // const infraccion = this.infraccionForm.value;
    this.infraccionService.create(infraccion).subscribe(infraccion => {
      if (!infraccion) return this.showSnackbar('Error al crear infraccion, intente nuevamente');
      this.router.navigate(['/infractores/view', this.infractorId]);
      this.showSnackbar('Infraccion creada');
    });
  }

  cancelar(): void {
    this.router.navigate(['/infractores/view', this.infractorId]);
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
