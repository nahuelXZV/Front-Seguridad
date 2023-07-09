import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Testigo } from 'src/app/testigos/interfaces/testigo.interface';
import { InfraccionService } from '../../services/infraccion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'infractor-list-testigos',
  templateUrl: './list-testigos.component.html',
  styleUrls: ['./list-testigos.component.css']
})
export class ListTestigosComponent implements OnInit {

  @Input()
  public testigos!: Testigo[];
  infractorId!: string;
  displayedColumns: string[] = ['nombre','apellido', 'cedulaIdentidad', 'nacionalidad', 'sexo','telefono'];

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

  createTestigo() {
    this.router.navigate(['infractores/infraccion-create-testigo', this.infractorId]);
  }

}

