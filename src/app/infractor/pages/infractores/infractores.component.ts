import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { InfractorService } from '../../services/infractor.service';
import { Infractor } from '../../interfaces/infractor.interface';
import { Foto } from '../../interfaces/foto.interface';

@Component({
  selector: 'infractor-infractores',
  templateUrl: './infractores.component.html',
  styleUrls: ['./infractores.component.css']
})
export class InfractoresComponent implements OnInit {
  // public urlFotos: string[] = [];
  public infractores: Infractor[] = [];
  displayedColumns: string[] = ['foto','nombre', 'apellido', 'cedulaIdentidad', 'nacionalidad','sexo', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private infractorService: InfractorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadInfractores();
  }


  loadInfractores() {
    this.infractorService.getAll().subscribe(infractores => {
      this.infractores = infractores;
    });

    // this.infractores.forEach((infractor) => {
    //   let fotos: Foto[] = infractor.fotos;
    //   if( fotos.length === 0){
    //     this.urlFotos.push('https://i.pinimg.com/564x/ed/1f/41/ed1f41959e7e9aa7fb0a18b76c6c2755.jpg');
    //   }else{
    //     this.urlFotos.push(fotos[0].dir);
    //   }
    // });
  }

  deleteInfractor(infractorId: string) {
    this.infractorService.delete(infractorId).subscribe(resp => {
      this.loadInfractores();
    });
  }

  // updateInfractor(infractorId: string) {
  //   this.router.navigate(['infractores/edit', infractorId]);
  // }

  viewInfractor(infractorId: string) {
    this.router.navigate(['infractores/view', infractorId]);
  }

  createInfractor() {
    this.router.navigate(['infractores/create']);
  }

  obtenerRutaImagen(infractor: Infractor): string {
    let fotos: Foto[] = infractor.fotos;
    if( fotos.length === 0){
      return 'https://i.pinimg.com/564x/ed/1f/41/ed1f41959e7e9aa7fb0a18b76c6c2755.jpg';
    }

    return fotos[0].dir;
  }
}
