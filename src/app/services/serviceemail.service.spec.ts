import { TestBed } from '@angular/core/testing';

import { ServiceemailService } from './serviceemail.service';

describe('ServiceemailService', () => {
  let service: ServiceemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
