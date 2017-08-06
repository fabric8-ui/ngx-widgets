import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListViewExampleComponent } from './listview/examples/listview-example.component';
import { NewFilterExampleComponent } from './new-filters/examples/n-filter-example.component';
import { RemainingCharsExampleComponent } from './remainingchars/examples/remainingchars-example.component';
import { SlideOutExampleComponent } from './slide-out-panel/examples/slide-out-example.component';
import { TreeListExampleComponent } from './treelist/examples/treelist-example.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
    path: 'home',
    component: HomeComponent
  },{
    path: 'emptystate',
    component: EmptyStateExampleComponent
  },{
    path: 'filter',
    component: FilterExampleComponent
  },{
    path: 'listview',
    component: ListViewExampleComponent
  },{
    path: 'new-filter',
    component: NewFilterExampleComponent
  },{
    path: 'remainingchars',
    component: RemainingCharsExampleComponent
  },{
    path: 'sort',
    component: SortExampleComponent
  },{
    path: 'slideoutpanel',
    component: SlideOutExampleComponent
  },{
    path: 'treelist',
    component: TreeListExampleComponent
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
