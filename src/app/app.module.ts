//import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Main areas
import { FilterExampleModule } from './filters/examples/filter-example.module';
import { HomeModule } from './home/home.module';
import { SortExampleModule } from './sort/examples/sort-example.module';
import { ToolbarExampleModule } from './toolbar/examples/toolbar-example.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FilterExampleModule,
    FormsModule,
    HomeModule,
    HttpModule,
    SortExampleModule,
    ToolbarExampleModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
