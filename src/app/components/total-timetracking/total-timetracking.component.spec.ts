import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTimetrackingComponent } from './total-timetracking.component';

describe('TotalTimetrackingComponent', () => {
  let component: TotalTimetrackingComponent;
  let fixture: ComponentFixture<TotalTimetrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalTimetrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTimetrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
