import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageSupervisorsComponent } from './menage-supervisors.component';

describe('MenageSupervisorsComponent', () => {
  let component: MenageSupervisorsComponent;
  let fixture: ComponentFixture<MenageSupervisorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageSupervisorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
