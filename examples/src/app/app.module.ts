import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { ProgressHttpModule } from "angular-progress-http";

import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ProgressHttpModule
    ]
})
export class AppModule {}