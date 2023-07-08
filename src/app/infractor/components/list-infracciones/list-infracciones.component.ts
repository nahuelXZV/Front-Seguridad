import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Infraccion } from '../../interfaces/infraccion.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { InfraccionService } from '../../services/infraccion.service';

@Component({
  selector: 'infractor-list-infracciones',
  templateUrl: './list-infracciones.component.html',
  styleUrls: ['./list-infracciones.component.css']
})
export class ListInfraccionesComponent implements OnInit {

  @Input()
  public infracciones!: Infraccion[];
  infractorId!: string;
  displayedColumns: string[] = ['fecha','hora', 'seccion', 'fila', 'asiento','descripcion', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private infraccionService: InfraccionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.infractorId = id;
    } else {
      console.log('error');
    }
    console.log(this.infractorId);
  }


  loadInfracciones() {
  }

  deleteInfractor(infractorId: string) {
    this.infraccionService.delete(infractorId).subscribe(resp => {
      this.loadInfracciones();
    });
  }

  viewInfraccion(infraccionId: string) {
    this.router.navigate(['infractores/view-infraccion', infraccionId]);
  }

  createInfraccion() {
    this.router.navigate(['infractores/create-infraccion', this.infractorId]);
  }

}

