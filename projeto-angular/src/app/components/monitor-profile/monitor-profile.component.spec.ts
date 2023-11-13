import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProfileComponent } from './monitor-profile.component';

describe('MonitorProfileComponent', () => {
  let component: MonitorProfileComponent;
  let fixture: ComponentFixture<MonitorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorProfileComponent]
    });
    fixture = TestBed.createComponent(MonitorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
