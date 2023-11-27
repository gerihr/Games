import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
