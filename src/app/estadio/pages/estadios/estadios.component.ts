import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Estadio } from '../../interfaces/estadio.interface';
import { EstadioService } from '../../services/estadio.service';

@Component({
  selector: 'estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent {
  displayedColumns: string[] = ['nombre', 'departamento', 'ciudad', 'direccion', 'acciones'];
  dataSource!: MatTableDataSource<Estadio>;
  public estadios: Estadio[] = [];
  public estadio!: Estadio;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private estadioService: EstadioService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.estadioService.getAll().subscribe(respEstadios => {
      this.estadios = respEstadios;
      this.dataSource = new MatTableDataSource(respEstadios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteEstadio(estadio: Estadio) {
    this.estadioService.delete(estadio.id).subscribe(resp => {
      const index = this.estadios.indexOf(estadio);
      if (index !== -1) {
        this.estadios.splice(index, 1);
      }
      this.changeDetectorRef.detectChanges();
      console.log('Estadio eliminado', estadio);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
