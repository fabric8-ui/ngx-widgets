import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MarkdownExampleComponent } from './markdown/examples/markdown-example.component';
import { SlideOutExampleComponent } from './slide-out-panel/examples/slide-out-example.component';
import {
  GitHubLinkAreaExampleComponent
} from './github-link-area/examples/github-link-area-example.component';
import { CardExampleComponent } from './card/examples/card-example.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'slideoutpanel',
    component: SlideOutExampleComponent
  }, {
    path: 'markdown',
    component: MarkdownExampleComponent
  }, {
    path: 'github-link-area',
    component: GitHubLinkAreaExampleComponent
  }, {
    path: 'card',
    component: CardExampleComponent
  }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
