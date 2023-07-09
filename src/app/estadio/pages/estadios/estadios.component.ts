import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Estadio } from '../../interfaces/estadio.interface';
import { EstadioService } from '../../services/estadio.service';

@Component({
  selector: 'estadio-estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent implements OnInit {
  public estadios: Estadio[] = [];
  displayedColumns: string[] = ['nombre', 'departamento', 'ciudad', 'direccion', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private estadioService: EstadioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadEstadios();
  }

  loadEstadios() {
    this.estadioService.getAll().subscribe(estadios => {
      this.estadios = estadios;
    });
  }

  deleteEstadio(estadioId: string) {
    this.estadioService.delete(estadioId).subscribe(resp => {
      this.loadEstadios();
    });
  }

  updateEstadio(estadioId: string) {
    this.router.navigate(['estadios/edit', estadioId]);
  }

  createEstadio() {
    this.router.navigate(['estadios/create']);
  }
}
