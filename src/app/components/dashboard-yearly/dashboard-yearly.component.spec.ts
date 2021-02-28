import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardYearlyComponent } from './dashboard-yearly.component';

describe('DashboardYearlyComponent', () => {
  let component: DashboardYearlyComponent;
  let fixture: ComponentFixture<DashboardYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
