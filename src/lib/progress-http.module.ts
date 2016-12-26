"use strict";

import {NgModule} from '@angular/core';
import { RequestOptions, ResponseOptions, XHRBackend, XSRFStrategy } from "@angular/http";

import { ProgressHttp } from "./progress-http.service";

export function progressHttpFactory(
    xhrBackend: XHRBackend,
    requestOptions: RequestOptions,
    responseOptions: ResponseOptions,
    xsrfStrategy: XSRFStrategy): ProgressHttp {
    return new ProgressHttp(xhrBackend, requestOptions, responseOptions, xsrfStrategy);
}

@NgModule({
    providers: [
        {provide: ProgressHttp, useFactory: progressHttpFactory, deps: [XHRBackend, RequestOptions, ResponseOptions, XSRFStrategy]},
    ]
})
export class ProgressHttpModule {}