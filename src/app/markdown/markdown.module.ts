import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from './markdown.component';
import { AlmEditableModule } from './../editable/almeditable.module';
import { GitHubLinkModule } from './../github-link/github-link.module';

@NgModule({
  declarations: [ MarkdownComponent ],
  imports: [ CommonModule, AlmEditableModule, GitHubLinkModule ],
  exports: [ MarkdownComponent ]
})
export class MarkdownModule { }
