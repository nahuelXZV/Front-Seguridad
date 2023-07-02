import { Component, OnInit } from '@angular/core';
import { Testigo } from '../../interfaces/testigo.interface';
import { TestigosService } from '../../services/testigos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'testigos',
  templateUrl: './testigos.component.html',
  styleUrls: ['./testigos.component.css']
})
export class TestigosComponent implements OnInit {
  public testigos: Testigo[] = [];
  displayedColumns: string[] = ['nombre','apellido', 'telefono', 'cedulaIdentidad','nacionalidad','sexo', 'actions'];


  constructor(
    private testigoService: TestigosService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadTestigos();
  }

  loadTestigos() {
    this.testigoService.getTestigos().subscribe((testigos) => {
      this.testigos = testigos;
    });
  }

  deleteTestigo(testigoId: string) {
    this.testigoService.deleteTestigo(testigoId).subscribe(() => {
      this.loadTestigos();
    });
  }

  updateTestigo(testigoId: string) {
    this.router.navigate(['testigos/edit', testigoId]);
  }

}
