import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GitHubLinkComponent } from './github-link.component';

/**
 * A module containing objects associated with the sample component
 */
@NgModule({
  imports: [ CommonModule, HttpClientModule ],
  declarations: [ GitHubLinkComponent ],
  exports: [ GitHubLinkComponent ]
})
export class GitHubLinkModule { }
