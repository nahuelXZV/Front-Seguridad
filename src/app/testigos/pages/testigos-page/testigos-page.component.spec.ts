import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestigosPageComponent } from './testigos-page.component';

describe('TestigosPageComponent', () => {
  let component: TestigosPageComponent;
  let fixture: ComponentFixture<TestigosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestigosPageComponent]
    });
    fixture = TestBed.createComponent(TestigosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
