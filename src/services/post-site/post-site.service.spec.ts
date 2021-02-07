import { TestBed } from '@angular/core/testing';

import { PostSiteService } from './post-site.service';

describe('PostSiteService', () => {
  let service: PostSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
