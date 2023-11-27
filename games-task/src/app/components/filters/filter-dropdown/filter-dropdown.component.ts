import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { FilterService } from 'src/app/data/filter.service';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent implements OnInit {
  @Input('options') options;

  selectedOption: string = '';
  isDropdownOpen: boolean = false;
  isActive: boolean;

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.buttonFilter.subscribe((observableValue) =>
      this.options.includes(observableValue)
        ? ((this.selectedOption = observableValue), (this.isActive = true))
        : ((this.selectedOption = ''), (this.isActive = false))
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelect(option: string): void {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.filterService.setButtonFilter(this.selectedOption);
  }

  ngOnDestroy() {
    this.filterService.buttonFilter.unsubscribe();
  }
}
