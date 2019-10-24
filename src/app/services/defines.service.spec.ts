import { TestBed } from '@angular/core/testing';

import { DefinesService } from './defines.service';

describe('DefinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefinesService = TestBed.get(DefinesService);
    expect(service).toBeTruthy();
  });
});
