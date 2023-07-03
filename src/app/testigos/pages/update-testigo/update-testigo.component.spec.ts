import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestigoComponent } from './update-testigo.component';

describe('UpdateTestigoComponent', () => {
  let component: UpdateTestigoComponent;
  let fixture: ComponentFixture<UpdateTestigoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTestigoComponent]
    });
    fixture = TestBed.createComponent(UpdateTestigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
