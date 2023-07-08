import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInfraccionComponent } from './create-infraccion.component';

describe('CreateInfraccionComponent', () => {
  let component: CreateInfraccionComponent;
  let fixture: ComponentFixture<CreateInfraccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInfraccionComponent]
    });
    fixture = TestBed.createComponent(CreateInfraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
