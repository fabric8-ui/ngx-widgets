//import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Main areas
import { HomeModule } from './home/home.module';
import { ListViewExampleModule } from './listview/examples/listview-example.module';
import { NewFilterExampleModule } from './new-filters/examples/n-filter-example.module';
import { RemainingCharsExampleModule } from './remainingchars/examples/remainingchars-example.module';
import { SlideOutExampleModule } from './slide-out-panel/examples/slide-out-example.module';
import { TreeListExampleModule } from './treelist/examples/treelist-example.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HomeModule,
    HttpModule,
    ListViewExampleModule,
    NewFilterExampleModule,
    NotificationExampleModule,
    RemainingCharsExampleModule,
    SortExampleModule,
    SlideOutExampleModule,
    TreeListExampleModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
