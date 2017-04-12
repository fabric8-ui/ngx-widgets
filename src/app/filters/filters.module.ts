import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule, DropdownConfig, TooltipModule } from 'ng2-bootstrap';
import { AlmSearchHighlight } from '../pipes/alm-search-highlight.pipe'

import { Filter } from './filter';
import { FilterComponent } from './filter.component';
import { FilterConfig } from './filter-config';
import { FilterEvent } from './filter-event';
import { FilterField } from './filter-field';
import { FilterFieldsComponent } from './filter-fields.component';
import { FilterResultsComponent } from './filter-results.component';
import { FilterQuery } from './filter-query';

export {
  Filter,
  FilterConfig,
  FilterEvent,
  FilterField,
  FilterQuery
}

@NgModule({
  imports: [ CommonModule, DropdownModule, FormsModule, TooltipModule ],
  declarations: [ AlmSearchHighlight, FilterComponent, FilterFieldsComponent, FilterResultsComponent ],
  exports: [ FilterComponent, FilterFieldsComponent, FilterResultsComponent ],
  providers: [ DropdownConfig ]
})
export class FiltersModule { }
