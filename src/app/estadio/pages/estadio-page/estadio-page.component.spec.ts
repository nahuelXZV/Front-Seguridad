import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadioPageComponent } from './estadio-page.component';

describe('EstadioPageComponent', () => {
  let component: EstadioPageComponent;
  let fixture: ComponentFixture<EstadioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadioPageComponent]
    });
    fixture = TestBed.createComponent(EstadioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
