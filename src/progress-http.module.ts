import {NgModule } from '@angular/core';
import { RequestOptions, XHRBackend } from "@angular/http";

import { HttpFactory } from "./interfaces";
import { ProgressBrowserXhrFactory } from "./xhr/ProgressBrowserXhrFactory";
import { XHRBackendFactory } from "./xhr/XHRBackendFactory";
import { HTTP_FACTORY } from "./http-factory.token";
import { AngularHttpFactory } from "./AngularHttpFactory";
import { ProgressHttp } from "./progress-http.service";

export function progressHttpFactory(
    xhrBackendFactory: XHRBackendFactory,
    backend: XHRBackend,
    requestOptions: RequestOptions,
    httpFactory: HttpFactory
): ProgressHttp {
    return new ProgressHttp(xhrBackendFactory, requestOptions, httpFactory, backend);
}

@NgModule({
    providers: [
        ProgressBrowserXhrFactory,
        XHRBackendFactory,
        AngularHttpFactory,
        { provide: HTTP_FACTORY, useExisting: AngularHttpFactory },
        {
            provide: ProgressHttp,
            useFactory: progressHttpFactory,
            deps: [XHRBackendFactory, XHRBackend, RequestOptions, HTTP_FACTORY]},
    ]
})
export class ProgressHttpModule {}
