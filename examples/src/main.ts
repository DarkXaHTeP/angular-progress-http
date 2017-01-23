import "zone.js/dist/zone";
import "reflect-metadata";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

const platform: any = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
