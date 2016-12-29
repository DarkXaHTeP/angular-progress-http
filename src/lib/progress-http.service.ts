import { Injectable } from "@angular/core";
import { Http, ConnectionBackend, RequestOptions, ResponseOptions, XHRBackend, XSRFStrategy } from "@angular/http";

import { ProgressBrowserXhr } from "./ProgressBrowserXhr";
import { HttpWithDownloadProgressListener, HttpWithUploadProgressListener} from "./interfaces";

@Injectable()
export class ProgressHttp extends Http implements HttpWithUploadProgressListener, HttpWithDownloadProgressListener {
    private _uploadCallback: (event: ProgressEvent) => void = null;
    private _downloadCallback: (event: ProgressEvent) => void = null;

    public constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        protected _defaultResponseOptions: ResponseOptions,
        protected _xsrfStrategy: XSRFStrategy
    ) {
        super(backend, defaultOptions)
    }

    public withDownloadProgressListener(
        listener: (event: ProgressEvent) => void
    ): HttpWithDownloadProgressListener {
        this._downloadCallback = listener;

        return this._buildProressHttpInstance();
    }

    public withUploadProgressListener(
        listener: (event: ProgressEvent) => void
    ): HttpWithUploadProgressListener {
        this._uploadCallback = listener;

        return this._buildProressHttpInstance();
    }

    private _buildProressHttpInstance(): ProgressHttp {
        const backend = new XHRBackend(
            ProgressBrowserXhr.create(this._uploadCallback, this._downloadCallback),
            this._defaultResponseOptions,
            this._xsrfStrategy);

        const http =  new ProgressHttp(backend, this._defaultOptions, this._defaultResponseOptions, this._xsrfStrategy);
        http._uploadCallback = this._uploadCallback;
        http._downloadCallback = this._downloadCallback;

        return http;
    }
}