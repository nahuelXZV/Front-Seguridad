import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfractorPageComponent } from './infractor-page.component';

describe('InfractorPageComponent', () => {
  let component: InfractorPageComponent;
  let fixture: ComponentFixture<InfractorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfractorPageComponent]
    });
    fixture = TestBed.createComponent(InfractorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
