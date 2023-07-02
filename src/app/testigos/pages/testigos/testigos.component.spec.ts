import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestigosComponent } from './testigos.component';

describe('TestigosComponent', () => {
  let component: TestigosComponent;
  let fixture: ComponentFixture<TestigosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestigosComponent]
    });
    fixture = TestBed.createComponent(TestigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
