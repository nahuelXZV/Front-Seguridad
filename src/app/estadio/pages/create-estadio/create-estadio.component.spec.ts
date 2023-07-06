import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstadioComponent } from './create-estadio.component';

describe('CreateEstadioComponent', () => {
  let component: CreateEstadioComponent;
  let fixture: ComponentFixture<CreateEstadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEstadioComponent]
    });
    fixture = TestBed.createComponent(CreateEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
