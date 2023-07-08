import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestigosComponent } from './list-testigos.component';

describe('ListTestigosComponent', () => {
  let component: ListTestigosComponent;
  let fixture: ComponentFixture<ListTestigosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTestigosComponent]
    });
    fixture = TestBed.createComponent(ListTestigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
