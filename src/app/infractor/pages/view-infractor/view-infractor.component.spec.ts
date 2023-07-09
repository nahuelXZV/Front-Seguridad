import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfractorComponent } from './view-infractor.component';

describe('ViewInfractorComponent', () => {
  let component: ViewInfractorComponent;
  let fixture: ComponentFixture<ViewInfractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfractorComponent]
    });
    fixture = TestBed.createComponent(ViewInfractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
