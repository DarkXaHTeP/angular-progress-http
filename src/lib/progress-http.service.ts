import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs, RequestOptions, ResponseOptions, Request, Response, ConnectionBackend, XHRBackend, XSRFStrategy } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { HttpWithDownloadProgressListener, HttpWithUploadProgressListener, Progress } from "./interfaces";
import {ProgressBrowserXhrFactory} from "./ProgressBrowserXhrFactory";

import { HTTP_FACTORY } from "./http-factory.token";
import { HttpFactory } from "./interfaces";

@Injectable()
export class ProgressHttp extends Http implements HttpWithUploadProgressListener, HttpWithDownloadProgressListener {
    private _uploadCallback: (progress: Progress) => void = null;
    private _downloadCallback: (progress: Progress) => void = null;
    private http: Http;

    public constructor(
        private progressBrowserXhrFactory: ProgressBrowserXhrFactory,
        private backend: ConnectionBackend,
        private requestOptions: RequestOptions,
        private httpFactory: HttpFactory,
        private responseOptions: ResponseOptions,
        private xsrfStrategy: XSRFStrategy
    ) {
        super(null, requestOptions);
        this.http = httpFactory.create(backend, requestOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.request(url, options);
    }

    public withDownloadProgressListener(
        listener: (progress: Progress) => void
    ): HttpWithDownloadProgressListener {
        this._downloadCallback = listener;

        return this._buildProgressHttpInstance();
    }

    public withUploadProgressListener(
        listener: (progress: Progress) => void
    ): HttpWithUploadProgressListener {
        this._uploadCallback = listener;

        return this._buildProgressHttpInstance();
    }

    private _buildProgressHttpInstance(): ProgressHttp {
        const progressHttp: ProgressHttp = new ProgressHttp(
            this.progressBrowserXhrFactory,
            this._buildXHRBackend(),
            this.requestOptions,
            this.httpFactory,
            this.responseOptions,
            this.xsrfStrategy);

        progressHttp._uploadCallback = this._uploadCallback;
        progressHttp._downloadCallback = this._downloadCallback;

        return progressHttp;
    }

    private _buildXHRBackend(): ConnectionBackend {
        const progressBrowserXhr = this.progressBrowserXhrFactory.create(this._uploadCallback, this._downloadCallback);
        const backend = new XHRBackend(progressBrowserXhr, this.responseOptions, this.xsrfStrategy);
        return backend;
    }
}