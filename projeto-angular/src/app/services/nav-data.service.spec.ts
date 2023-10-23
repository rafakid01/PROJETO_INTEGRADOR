import { TestBed } from '@angular/core/testing';

import { NavDataService } from './nav-data.service';

describe('NavDataService', () => {
  let service: NavDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
