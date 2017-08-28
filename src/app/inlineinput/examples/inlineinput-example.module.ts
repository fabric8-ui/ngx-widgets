import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineInputModule } from './../inlineinput.mdoule';
import { InlineInputExampleComponent } from './inlineinput-example.component';

@NgModule({
  declarations: [ InlineInputExampleComponent ],
  imports: [ CommonModule, InlineInputModule, RouterModule ]
})
export class InlineInputExampleModule {
  constructor() {}
}
