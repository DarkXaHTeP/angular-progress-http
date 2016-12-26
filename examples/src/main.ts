"use strict";

import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

const platform: any = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
