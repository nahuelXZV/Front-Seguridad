import { TestBed } from '@angular/core/testing';

import { SansionService } from './sansion.service';

describe('SansionService', () => {
  let service: SansionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SansionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
