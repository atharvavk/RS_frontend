import { TestBed } from '@angular/core/testing';

import { StorageGuard } from './storage.guard';

describe('StorageGuard', () => {
  let guard: StorageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StorageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
