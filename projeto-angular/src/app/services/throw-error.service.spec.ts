import { TestBed } from '@angular/core/testing';

import { ThrowErrorService } from './throw-error.service';

describe('ThrowErrorService', () => {
  let service: ThrowErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThrowErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
