import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLabelDropdownComponent } from './filter-label-dropdown.component';

describe('FilterDropdownComponent', () => {
  let component: FilterLabelDropdownComponent;
  let fixture: ComponentFixture<FilterLabelDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLabelDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLabelDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
