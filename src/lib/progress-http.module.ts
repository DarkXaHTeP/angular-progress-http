import {NgModule, Injector } from '@angular/core';
import { RequestOptions, Http } from "@angular/http";

import { ProgressBrowserXhrFactory } from "./ProgressBrowserXhrFactory";
import { ProgressHttp } from "./progress-http.service";

export function progressHttpFactory(
    progressBrowserXhrFactory: ProgressBrowserXhrFactory,
    injector: Injector,
    requestOptions: RequestOptions,
    http: Http
): ProgressHttp {
    return new ProgressHttp(progressBrowserXhrFactory, injector, requestOptions, http);
}

@NgModule({
    providers: [
        ProgressBrowserXhrFactory,
        {provide: ProgressHttp, useFactory: progressHttpFactory, deps: [ProgressBrowserXhrFactory, Injector, RequestOptions, Http]},
    ]
})
export class ProgressHttpModule {}
