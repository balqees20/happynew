import { TestBed } from '@angular/core/testing';

import { HappydataService } from './happydata.service';

describe('HappydataService', () => {
  let service: HappydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
