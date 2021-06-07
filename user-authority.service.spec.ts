import { TestBed } from '@angular/core/testing';

import { UserAuthorityService } from './user-authority.service';

describe('UserAuthorityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAuthorityService = TestBed.get(UserAuthorityService);
    expect(service).toBeTruthy();
  });
});
