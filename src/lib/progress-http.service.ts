"use strict";

import { Injectable } from "@angular/core";
import { Http, ConnectionBackend, RequestOptions, ResponseOptions, XHRBackend, XSRFStrategy } from "@angular/http";

import { ProgressBrowserXhr } from "./ProgressBrowserXhr";

@Injectable()
export class ProgressHttp extends Http {
    public constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        protected _defaultResponseOptions: ResponseOptions,
        protected _xsrfStrategy: XSRFStrategy
    ) {
        super(backend, defaultOptions)
    }

    public withProgressListener(
        uploadProgressCallback: (event: ProgressEvent) => void = null,
        downloadProgressCallback: (event: ProgressEvent) => void = null
    ): ProgressHttp {
        const backend = new XHRBackend(
            ProgressBrowserXhr.create(uploadProgressCallback, downloadProgressCallback),
            this._defaultResponseOptions,
            this._xsrfStrategy);
        
        return new ProgressHttp(backend, this._defaultOptions, this._defaultResponseOptions, this._xsrfStrategy);
    }
}