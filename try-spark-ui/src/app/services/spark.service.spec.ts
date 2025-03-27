import { TestBed } from '@angular/core/testing';

import { SparkService } from './spark.service';

describe('SparkService', () => {
  let service: SparkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
