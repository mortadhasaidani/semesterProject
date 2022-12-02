import {TestBed} from '@angular/core/testing';

import {DogCategoriesService} from './dog-categories.service';

describe('DogCategoriesService', () => {
  let service: DogCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
