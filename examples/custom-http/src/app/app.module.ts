import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProgressHttpModule, HTTP_FACTORY } from 'angular-progress-http';

import { AppComponent } from './app.component';
import { LoggingHttpFactory } from './logging-http/logging-http-factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProgressHttpModule
  ],
  providers: [
    { provide: HTTP_FACTORY, useClass: LoggingHttpFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
