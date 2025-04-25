import { TestBed } from '@angular/core/testing';

import { CloudflareApiService } from './cloudflare-api.service';

describe('CloudflareApiService', () => {
  let service: CloudflareApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudflareApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
