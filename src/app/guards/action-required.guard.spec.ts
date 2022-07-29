import { TestBed } from '@angular/core/testing';

import { ActionRequiredGuard } from './action-required.guard';

describe('ActionRequiredGuard', () => {
  let guard: ActionRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActionRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
