import { InjectionToken } from "@angular/core";
import { HttpFactory } from "./interfaces";

export const HTTP_FACTORY = new InjectionToken<HttpFactory>("Http implementation factory");