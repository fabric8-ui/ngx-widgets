import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewFilterExampleComponent } from './n-filter-example.component';

const routes: Routes = [{
  path: '',
  component: NewFilterExampleComponent
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NewFilterExampleRoutingModule {}
