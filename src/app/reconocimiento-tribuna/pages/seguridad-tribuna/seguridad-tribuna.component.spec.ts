import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadTribunaComponent } from './seguridad-tribuna.component';

describe('SeguridadTribunaComponent', () => {
  let component: SeguridadTribunaComponent;
  let fixture: ComponentFixture<SeguridadTribunaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguridadTribunaComponent]
    });
    fixture = TestBed.createComponent(SeguridadTribunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
