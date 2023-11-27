import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterService } from 'src/app/data/filter.service';

@Component({
  selector: 'app-filter-label-dropdown',
  templateUrl: './filter-label-dropdown.component.html',
  styleUrls: ['./filter-label-dropdown.component.scss'],
})
export class FilterLabelDropdownComponent implements OnInit {
  @Input('options') options;
  @Input('label') label;
  @Input('mobileLabel') mobileLabel;
  @Input('hasImage') hasImage;
  @Output() chosenFilter = new EventEmitter<string>();
  @Input('value') value;

  selectedOption?: string;
  isDropdownOpen: boolean = false;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.value.subscribe((res) => {
      res !== ''
        ? (this.selectedOption = res)
        : (this.selectedOption = undefined);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelect(option: string): void {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.chosenFilter.emit(option);
  }

  ngOnDestroy() {
    this.value.unsubscribe();
  }
}
