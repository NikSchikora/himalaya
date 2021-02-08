import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeTrackingBottomSheetComponent } from './new-time-tracking-bottom-sheet.component';

describe('NewTimeTrackingBottomSheetComponent', () => {
  let component: NewTimeTrackingBottomSheetComponent;
  let fixture: ComponentFixture<NewTimeTrackingBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTimeTrackingBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeTrackingBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
