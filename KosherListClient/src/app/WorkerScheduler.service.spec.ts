import { TestBed } from '@angular/core/testing';

import { WorkerSchedulerService } from './WorkerScheduler.service';

describe('WorkerSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerSchedulerService = TestBed.get(WorkerSchedulerService);
    expect(service).toBeTruthy();
  });
});
