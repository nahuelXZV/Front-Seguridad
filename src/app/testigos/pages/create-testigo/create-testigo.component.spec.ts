import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestigoComponent } from './create-testigo.component';

describe('CreateTestigoComponent', () => {
  let component: CreateTestigoComponent;
  let fixture: ComponentFixture<CreateTestigoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTestigoComponent]
    });
    fixture = TestBed.createComponent(CreateTestigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
