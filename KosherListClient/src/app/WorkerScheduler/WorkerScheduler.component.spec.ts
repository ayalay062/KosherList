import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSchedulerComponent } from './WorkerScheduler.component';

describe('WorkerSchedulerComponent', () => {
  let component: WorkerSchedulerComponent;
  let fixture: ComponentFixture<WorkerSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
