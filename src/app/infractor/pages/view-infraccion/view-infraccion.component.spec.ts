import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfraccionComponent } from './view-infraccion.component';

describe('ViewInfraccionComponent', () => {
  let component: ViewInfraccionComponent;
  let fixture: ComponentFixture<ViewInfraccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfraccionComponent]
    });
    fixture = TestBed.createComponent(ViewInfraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
