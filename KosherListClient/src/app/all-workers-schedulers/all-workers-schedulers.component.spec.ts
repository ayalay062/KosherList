import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkersSchedulersComponent } from './all-workers-schedulers.component';

describe('AllWorkersSchedulersComponent', () => {
  let component: AllWorkersSchedulersComponent;
  let fixture: ComponentFixture<AllWorkersSchedulersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWorkersSchedulersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkersSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
