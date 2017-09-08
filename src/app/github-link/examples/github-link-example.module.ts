import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GitHubLinkModule } from '../github-link.module';
import { GitHubLinkExampleComponent } from './github-link-example.component';

@NgModule({
  declarations: [ GitHubLinkExampleComponent ],
  imports: [ CommonModule, RouterModule, FormsModule, GitHubLinkModule ],
})
export class GitHubLinkExampleModule {
  constructor() {}
}
