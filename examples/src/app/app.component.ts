"use strict";

import { Component } from "@angular/core";

@Component({
    selector: "example-app",
    template: "<div>Hello {{name}}</div>"
})
export class AppComponent {
    public name: string = "John";
}