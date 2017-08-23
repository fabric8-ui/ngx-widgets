import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmEditableModule } from './../editable/almeditable.module';
import { Autosize } from './../autosize/autosize.directive';
import { InlineInputComponent } from './inlineinput.component';

@NgModule({
  declarations: [ InlineInputComponent, Autosize ],
  imports: [ CommonModule, AlmEditableModule ],
  exports: [ InlineInputComponent ]
})
export class InlineInputModule { }
