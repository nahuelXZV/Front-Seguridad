import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInfractorComponent } from './create-infractor.component';

describe('CreateInfractorComponent', () => {
  let component: CreateInfractorComponent;
  let fixture: ComponentFixture<CreateInfractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInfractorComponent]
    });
    fixture = TestBed.createComponent(CreateInfractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
