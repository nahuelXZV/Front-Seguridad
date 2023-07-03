import { TestBed } from '@angular/core/testing';

import { InfractorService } from './infractor.service';

describe('InfractorService', () => {
  let service: InfractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
