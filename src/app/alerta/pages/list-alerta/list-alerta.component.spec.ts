import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlertaComponent } from './list-alerta.component';

describe('ListAlertaComponent', () => {
  let component: ListAlertaComponent;
  let fixture: ComponentFixture<ListAlertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlertaComponent]
    });
    fixture = TestBed.createComponent(ListAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
