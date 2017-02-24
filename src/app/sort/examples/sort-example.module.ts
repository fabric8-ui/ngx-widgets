import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { DropdownModule } from 'ng2-bootstrap';
import { SortModule } from '../sort.module';

import { SortExampleComponent } from './sort-example.component';
import { SortExampleRoutingModule } from './sort-example-routing.module';

@NgModule({
  imports: [ CommonModule, DropdownModule, HttpModule, SortExampleRoutingModule, SortModule ],
  declarations: [ SortExampleComponent ]
})
export class SortExampleModule {
  constructor(http: Http) {}
}
