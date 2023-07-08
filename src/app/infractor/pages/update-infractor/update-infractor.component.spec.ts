import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfractorComponent } from './update-infractor.component';

describe('UpdateInfractorComponent', () => {
  let component: UpdateInfractorComponent;
  let fixture: ComponentFixture<UpdateInfractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInfractorComponent]
    });
    fixture = TestBed.createComponent(UpdateInfractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
