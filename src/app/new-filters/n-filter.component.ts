import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { NewFilter } from './n-filter';
import { NewFilterConfig } from './n-filter-config';
import { NewFilterEvent } from './n-filter-event';

import * as _ from 'lodash';

/**
 * Component for the filter bar's filter entry components
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'alm-n-filter',
  styleUrls: ['./n-filter.component.scss'],
  templateUrl: './n-filter.component.html'
})
export class NewFilterComponent implements OnInit {
  @Input() config: NewFilterConfig;

  @Output('onChange') onChange = new EventEmitter();
  @Output('typeAhedFilterQueries') typeAhedFilterQueries = new EventEmitter();

  prevConfig: NewFilterConfig;

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

    if (this.config && this.config.appliedFilters === undefined) {
      this.config.appliedFilters = [];
    }
  }

  // Filter functions

  addFilter($event: NewFilterEvent): void {
    let newFilter = {
      field: $event.field,
      query: $event.query,
      value: $event.value
    } as NewFilter;

    if (!this.filterExists(newFilter)) {
      if (newFilter.field.type === 'select') {
        this.enforceSingleSelect(newFilter);
      }
      this.config.appliedFilters.push(newFilter);
      $event.appliedFilters = this.config.appliedFilters;
      this.onChange.emit($event);
    }
  }

  enforceSingleSelect(filter: NewFilter): void {
    _.remove(this.config.appliedFilters, {title: filter.field.title});
  }

  filterExists(filter: NewFilter): boolean {
    let foundFilter = _.find(this.config.appliedFilters, {
      value: filter.value
    });
    return foundFilter !== undefined;
  }

  onClear($event: NewFilter[]): void {
    this.config.appliedFilters = $event;
    this.onChange.emit({
      appliedFilters: $event
    } as NewFilterEvent);
  }

  onFilterQueries(event: any) {
    this.typeAhedFilterQueries.emit(event);
  }
}
