import { Injectable, Inject } from "@angular/core";
import { Http, RequestOptionsArgs, RequestOptions, Request, Response, ConnectionBackend } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { HttpWithDownloadProgressListener, HttpWithUploadProgressListener, Progress } from "./interfaces";
import { XHRBackendFactory } from "./XHRBackendFactory";

import { HTTP_FACTORY } from "./http-factory.token";
import { HttpFactory } from "./interfaces";

@Injectable()
export class ProgressHttp extends Http implements HttpWithUploadProgressListener, HttpWithDownloadProgressListener {
    private _uploadCallback: (progress: Progress) => void = null;
    private _downloadCallback: (progress: Progress) => void = null;
    private http: Http;

    public constructor(
        private xhrBackendFactory: XHRBackendFactory,
        private requestOptions: RequestOptions,
        @Inject(HTTP_FACTORY) private httpFactory: HttpFactory,
        backend: ConnectionBackend
    ) {
        super(null, requestOptions);
        this.http = httpFactory.create(backend, requestOptions);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
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
            this.xhrBackendFactory,
            this.requestOptions,
            this.httpFactory,
            this._buildXHRBackend());

        progressHttp._uploadCallback = this._uploadCallback;
        progressHttp._downloadCallback = this._downloadCallback;

        return progressHttp;
    }

    private _buildXHRBackend(): ConnectionBackend {
        const backend = this.xhrBackendFactory.create(this._uploadCallback, this._downloadCallback);
        return backend;
    }
}
