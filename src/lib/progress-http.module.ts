import {NgModule, Injector } from '@angular/core';
import { RequestOptions, Http, ResponseOptions, XSRFStrategy, XHRBackend } from "@angular/http";

import { ProgressBrowserXhrFactory } from "./ProgressBrowserXhrFactory";
import { ProgressHttp } from "./progress-http.service";
import { HTTP_FACTORY } from "./http-factory.token";
import { HttpFactory } from "./interfaces";
import { DefaultHttpFactory } from "./DefaultHttpFactory";

export function progressHttpFactory(
    progressBrowserXhrFactory: ProgressBrowserXhrFactory,
    backend: XHRBackend,
    requestOptions: RequestOptions,
    httpFactory: HttpFactory,
    responseOptions: ResponseOptions,
    xsrfStrategy: XSRFStrategy
): ProgressHttp {
    return new ProgressHttp(progressBrowserXhrFactory, backend, requestOptions, httpFactory, responseOptions, xsrfStrategy);
}

@NgModule({
    providers: [
        ProgressBrowserXhrFactory,
        { provide: HTTP_FACTORY, useClass: DefaultHttpFactory },
        {
            provide: ProgressHttp,
            useFactory: progressHttpFactory,
            deps: [ProgressBrowserXhrFactory, XHRBackend, RequestOptions, HTTP_FACTORY, ResponseOptions, XSRFStrategy]},
    ]
})
export class ProgressHttpModule {}
