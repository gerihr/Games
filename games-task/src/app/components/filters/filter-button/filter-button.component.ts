import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterService } from 'src/app/data/filter.service';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {
  @Input('buttonLabel') label;
  isActive: boolean;

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.buttonFilter.subscribe((observableValue) =>
      this.label == observableValue
        ? (this.isActive = true)
        : (this.isActive = false)
    );
  }

  onButtonClick() {
    this.filterService.setButtonFilter(this.label);
  }
  ngOnDestroy() {
    this.filterService.buttonFilter.unsubscribe();
  }
}
