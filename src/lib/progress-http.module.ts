import {NgModule } from '@angular/core';
import { RequestOptions, XHRBackend } from "@angular/http";

import { ProgressBrowserXhrFactory } from "./ProgressBrowserXhrFactory";
import { XHRBackendFactory } from "./XHRBackendFactory";
import { ProgressHttp } from "./progress-http.service";
import { HTTP_FACTORY } from "./http-factory.token";
import { HttpFactory } from "./interfaces";
import { AngularHttpFactory } from "./AngularHttpFactory";

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
        { provide: HTTP_FACTORY, useClass: AngularHttpFactory },
        {
            provide: ProgressHttp,
            useFactory: progressHttpFactory,
            deps: [XHRBackendFactory, XHRBackend, RequestOptions, HTTP_FACTORY]},
    ]
})
export class ProgressHttpModule {}
