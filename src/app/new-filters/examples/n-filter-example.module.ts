import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { DropdownModule, DropdownConfig } from 'ng2-bootstrap';

import { NewFiltersModule } from '../n-filters.module';
import { NewFilterExampleComponent } from './n-filter-example.component';
import { NewFilterExampleRoutingModule } from './n-filter-example-routing.module';

@NgModule({
  imports: [ CommonModule, DropdownModule, NewFilterExampleRoutingModule, NewFiltersModule, HttpModule ],
  declarations: [ NewFilterExampleComponent ],
  providers: [ DropdownConfig ]
})
export class NewFilterExampleModule {
  constructor(http: Http) {}
}
