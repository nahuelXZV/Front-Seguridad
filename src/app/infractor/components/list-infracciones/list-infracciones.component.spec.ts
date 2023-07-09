import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfraccionesComponent } from './list-infracciones.component';

describe('ListInfraccionesComponent', () => {
  let component: ListInfraccionesComponent;
  let fixture: ComponentFixture<ListInfraccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInfraccionesComponent]
    });
    fixture = TestBed.createComponent(ListInfraccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
