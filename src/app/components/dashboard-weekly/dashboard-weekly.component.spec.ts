import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWeeklyComponent } from './dashboard-weekly.component';

describe('DashboardWeeklyComponent', () => {
  let component: DashboardWeeklyComponent;
  let fixture: ComponentFixture<DashboardWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
