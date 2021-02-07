import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskBottomSheetComponent } from './edit-task-bottom-sheet.component';

describe('EditTaskBottomSheetComponent', () => {
  let component: EditTaskBottomSheetComponent;
  let fixture: ComponentFixture<EditTaskBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
