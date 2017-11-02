import { InjectionToken } from "@angular/core";
import { HttpFactory } from "./interfaces/HttpFactory";

export const HTTP_FACTORY = new InjectionToken<HttpFactory>("Http implementation factory");