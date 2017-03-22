import {NgModule } from '@angular/core';
import { RequestOptions, XHRBackend } from "@angular/http";

import { ProgressBrowserXhrFactory } from "./ProgressBrowserXhrFactory";
import { XHRBackendFactory } from "./XHRBackendFactory";
import { ProgressHttp } from "./progress-http.service";
import { HTTP_FACTORY } from "./http-factory.token";
import { HttpFactory } from "./interfaces";
import { DefaultHttpFactory } from "./DefaultHttpFactory";

export function progressHttpFactory(
    xhrBackendFactory: XHRBackendFactory,
    backend: XHRBackend,
    requestOptions: RequestOptions,
    httpFactory: HttpFactory
): ProgressHttp {
    return new ProgressHttp(xhrBackendFactory, backend, requestOptions, httpFactory);
}

@NgModule({
    providers: [
        ProgressBrowserXhrFactory,
        XHRBackendFactory,
        { provide: HTTP_FACTORY, useClass: DefaultHttpFactory },
        {
            provide: ProgressHttp,
            useFactory: progressHttpFactory,
            deps: [XHRBackendFactory, XHRBackend, RequestOptions, HTTP_FACTORY]},
    ]
})
export class ProgressHttpModule {}
