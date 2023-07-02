import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestigosService } from '../../services/testigos.service';
import { Infraccion } from '../../interfaces/infraccion.interface';

@Component({
  selector: 'app-update-testigo',
  templateUrl: './update-testigo.component.html',
  styleUrls: ['./update-testigo.component.css']
})
export class UpdateTestigoComponent implements OnInit{
  editForm: FormGroup;
  testigoId!: string;
  sexos: string[] = ['femenino', 'masculino', 'otro'];
  infracciones: Infraccion[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testigoService: TestigosService
  ) {
    this.editForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      cedulaIdentidad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      sexo: ['', Validators.required],
      infraccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.testigoId = id;
    this.loadUser(this.testigoId);
  } else {
    // Manejar el caso en el que el ID es nulo, por ejemplo, redirigiendo a una página de error o mostrando un mensaje al usuario.
    console.log('error');
  }
  this.testigoService.getInfracciones().subscribe(
    (infracciones: Infraccion[]) => {
      this.infracciones = infracciones;
    },
    (error) => {
      console.log('Error al obtener las infracciones:', error);
    }
  );

  }

  loadUser(testigoId: string): void {
    this.testigoService.getTestigo(testigoId).subscribe(testigo => {
      if (testigo !== null && testigo !== undefined) {
        this.editForm.patchValue({
          nombre: testigo.nombre,
          apellido: testigo.apellido,
          telefono: testigo.telefono,
          cedulaIdentidad: testigo.cedulaIdentidad,
          nacionalidad: testigo.nacionalidad,
          sexo: testigo.sexo,
          // Otros campos del formulario con sus valores correspondientes
        });
      } else {
        // Manejar el caso en el que el usuario no existe, por ejemplo, redirigiendo a una página de error o mostrando un mensaje al usuario.
      }
    });
  }

  saveTestigo(): void {
    // Obtén los valores del formulario y actualiza el usuario con el ID proporcionado
    const testigoData = this.editForm.value;
    this.testigoService.updateTestigo(this.testigoId, testigoData).subscribe(response => {
        this.router.navigate(['/testigos']);
        // Realiza cualquier otra acción necesaria después de editar el usuario
      },
      error => {
        console.error('Error al editar el testigo', error);
        // Maneja el error de alguna manera apropiada para tu aplicación
      }
    );
  }
}
