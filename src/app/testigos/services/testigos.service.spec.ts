import { TestBed } from '@angular/core/testing';

import { TestigosService } from './testigos.service';

describe('TestigosService', () => {
  let service: TestigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestigosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
