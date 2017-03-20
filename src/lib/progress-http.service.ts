import { Injectable, Injector, ReflectiveInjector, Provider } from "@angular/core";
import { BrowserXhr, Http, RequestOptionsArgs, RequestOptions, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { HttpWithDownloadProgressListener, HttpWithUploadProgressListener, Progress } from "./interfaces";
import {ProgressBrowserXhrFactory} from "./ProgressBrowserXhrFactory";

@Injectable()
export class ProgressHttp extends Http implements HttpWithUploadProgressListener, HttpWithDownloadProgressListener {
    private _uploadCallback: (progress: Progress) => void = null;
    private _downloadCallback: (progress: Progress) => void = null;

    public constructor(
        private progressBrowserXhrFactory: ProgressBrowserXhrFactory,
        private injector: Injector,
        private requestOptions: RequestOptions,
        private http: Http
    ) {
        super(null, requestOptions);
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
            this.injector,
            this.requestOptions,
            this._buildHttpInstance());

        progressHttp._uploadCallback = this._uploadCallback;
        progressHttp._downloadCallback = this._downloadCallback;

        return progressHttp;
    }

    private _buildHttpInstance(): Http {
        const progressBrowserXhr = this.progressBrowserXhrFactory.create(this._uploadCallback, this._downloadCallback);

        const xhrProvider: Provider = { provide: BrowserXhr, useValue: progressBrowserXhr };
        const httpInjector = ReflectiveInjector.resolveAndCreate([ xhrProvider ], this.injector);

        const http: Http = httpInjector.get(Http);

        return http;
    }
}