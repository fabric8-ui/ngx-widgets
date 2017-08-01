import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule, DropdownConfig, TooltipModule } from 'ng2-bootstrap';

import { AlmSearchHighlightModule } from './../pipes/alm-search-highlight.module';
import { NewFilter } from './n-filter';
import { NewFilterComponent } from './n-filter.component';
import { NewFilterConfig } from './n-filter-config';
import { NewFilterEvent } from './n-filter-event';
import { NewFilterField } from './n-filter-field';
import { NewFilterFieldsComponent } from './n-filter-fields.component';
import { NewFilterResultsComponent } from './n-filter-results.component';
import { NewFilterQuery } from './n-filter-query';

export {
  NewFilter,
  NewFilterConfig,
  NewFilterEvent,
  NewFilterField,
  NewFilterQuery
}

@NgModule({
  imports: [ CommonModule, DropdownModule, FormsModule, TooltipModule, AlmSearchHighlightModule ],
  declarations: [ NewFilterComponent, NewFilterFieldsComponent, NewFilterResultsComponent ],
  exports: [ NewFilterComponent, NewFilterFieldsComponent, NewFilterResultsComponent ],
  providers: [ DropdownConfig ]
})
export class NewFiltersModule { }
