import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEstadioComponent } from './update-estadio.component';

describe('UpdateEstadioComponent', () => {
  let component: UpdateEstadioComponent;
  let fixture: ComponentFixture<UpdateEstadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEstadioComponent]
    });
    fixture = TestBed.createComponent(UpdateEstadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
