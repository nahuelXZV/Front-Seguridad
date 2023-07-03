import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfractoresComponent } from './infractores.component';

describe('InfractoresComponent', () => {
  let component: InfractoresComponent;
  let fixture: ComponentFixture<InfractoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfractoresComponent]
    });
    fixture = TestBed.createComponent(InfractoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
