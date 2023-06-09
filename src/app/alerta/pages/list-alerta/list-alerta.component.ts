import { Component, ViewChild } from '@angular/core';
import { Alerta } from '../../interfaces/alerta.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Imagene } from '../../interfaces/imagen.interface';
import { AlertaService } from '../../services/alerta.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-alerta',
  templateUrl: './list-alerta.component.html',
  styleUrls: ['./list-alerta.component.css']
})
export class ListAlertaComponent {
  public alertas: Alerta[] = [];
  displayedColumns: string[] = ['foto', 'motivo', 'fecha', 'hora', 'acciones'];
  dataSource!: MatTableDataSource<Alerta>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alertaService: AlertaService,
    private router: Router,
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.loadAlertas();
  }

  loadAlertas() {
    this.alertaService.getAll().subscribe(alertas => {
      this.alertas = alertas;
      this.dataSource = new MatTableDataSource(this.alertas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteAlerta(alertaID: string) {
    this.alertaService.delete(alertaID).subscribe(resp => {
      this.loadAlertas();
    });
  }

  viewAlerta(alertaID: string) {
    this.router.navigate(['alertas/show', alertaID]);
  }

  obtenerRutaImagen(alerta: Alerta): string {
    let fotos: Imagene[] = alerta.imagenes;
    if (fotos.length === 0) {
      return 'https://i.pinimg.com/564x/ed/1f/41/ed1f41959e7e9aa7fb0a18b76c6c2755.jpg';
    }
    return fotos[0].dir;
  }
}
