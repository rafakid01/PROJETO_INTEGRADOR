import { TestBed } from '@angular/core/testing';

import { DjangoConnService } from './django-conn.service';

describe('DjangoConnService', () => {
  let service: DjangoConnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DjangoConnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
