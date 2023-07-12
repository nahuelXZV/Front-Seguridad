import { Component, ViewChild } from '@angular/core';
import { AlertaService } from '../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alerta } from '../../interfaces/alerta.interface';
import { Infractor } from 'src/app/infractor/interfaces/infractor.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-show-alerta',
  templateUrl: './show-alerta.component.html',
  styleUrls: ['./show-alerta.component.css']
})
export class ShowAlertaComponent {

  public id!: string;
  public alerta!: Alerta;
  public infractores!: {
    id: string;
    createdAt: string;
    updatedAt: string;
    infractor: Infractor;
  }[];
  infractorId!: string;
  displayedColumns: string[] = ['nombre', 'apellido', 'cedulaIdentidad', 'nacionalidad', 'sexo'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.loadAlerta(this.id);
    } else {
      // Manejar el caso en el que el ID es nulo
      console.log('error');
    }
  }

  loadAlerta(id: string): void {
    this.alertaService.getById(id).subscribe(alerta => {
      if (!alerta) return;
      this.alerta = alerta;
      this.infractores = alerta.infractores;
    });
  }

}
