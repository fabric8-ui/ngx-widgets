import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { AlmSearchHighlight } from '../pipes/alm-search-highlight.pipe'

import { NewFilterConfig } from './n-filter-config';
import { NewFilterEvent } from './n-filter-event';
import { NewFilterField } from './n-filter-field';
import { NewFilterQuery } from './n-filter-query';

import * as _ from 'lodash';

/**
 * Component for the filter bar's filter entry components
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'alm-n-filter-fields',
  styleUrls: ['./n-filter-fields.component.scss'],
  templateUrl: './n-filter-fields.component.html'
})
export class NewFilterFieldsComponent implements OnInit {
  @Input() config: NewFilterConfig;

  @Output('onAdd') onAdd = new EventEmitter();
  @Output('onSelectType') onSelecttype = new EventEmitter();
  @Output('onFilterQueries') onFilterQueries = new EventEmitter();

  currentField: NewFilterField;
  currentValue: string;
  prevConfig: NewFilterConfig;
  show: boolean = false;
  isTypeAheadDropdownOpen: boolean = false;
  showFilterList: boolean = false;

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
    this.setupConfig();
  }

  ngDoCheck(): void {
    // Do a deep compare on config
    if (!_.isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  setupConfig(): void {
    this.prevConfig = _.cloneDeep(this.config);

    if (this.config && this.config.fields === undefined) {
      this.config.fields = [];
    }
    if (this.config && this.config.tooltipPlacement === undefined) {
      this.config.tooltipPlacement = 'top';
    }

    let fieldFound: boolean = false;
    if (this.currentField !== undefined) {
      _.find(this.config.fields, (nextField) => {
        if (nextField.id === this.currentField.id) {
          fieldFound = true;
          return;
        }
      });
    }
    if (!fieldFound) {
      this.currentField = this.config.fields[0];
      this.currentValue = null;
    }

    if (this.currentValue === undefined) {
      this.currentValue = null;
    }
  }

  // Field functions

  onValueKeyPress(keyEvent: KeyboardEvent): void {
    if (keyEvent.which === 13) {
      this.onAdd.emit({
        field: this.currentField,
        value: this.currentValue
      } as NewFilterEvent);
      this.currentValue = undefined;
    }
  }

  selectField(field: NewFilterField): void {
    this.currentField = field;
    this.currentValue = null;
  }

  emitSelectedField() {
    if (this.currentField) {
      this.onSelecttype.emit(this.currentField);
    }
  }

  selectValue(filterQuery: NewFilterQuery): void {
    if (filterQuery != null) {
      this.onAdd.emit({
        field: this.currentField,
        query: filterQuery,
        value: filterQuery.value
      } as NewFilterEvent);
      this.currentValue = null;
    }
  }

  filterList(event: any) {
    this.onFilterQueries.emit({field: this.currentField, text: event});
  }
  openFilterList() {
    this.showFilterList !== this.showFilterList;
  }
}
