import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDashComponent } from './monitor-dash.component';

describe('MonitorDashComponent', () => {
  let component: MonitorDashComponent;
  let fixture: ComponentFixture<MonitorDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorDashComponent]
    });
    fixture = TestBed.createComponent(MonitorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
