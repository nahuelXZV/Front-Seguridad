import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAlertaComponent } from './show-alerta.component';

describe('ShowAlertaComponent', () => {
  let component: ShowAlertaComponent;
  let fixture: ComponentFixture<ShowAlertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAlertaComponent]
    });
    fixture = TestBed.createComponent(ShowAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
