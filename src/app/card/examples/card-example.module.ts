import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './../card.module';
import { CardExampleComponent } from './card-example.component';

@NgModule({
  declarations: [ CardExampleComponent ],
  imports: [ CardModule, CommonModule ]
})
export class CardExampleModule {
  constructor() {}
}
