import { Injectable } from "@angular/core";
import { XHRBackend, ResponseOptions, XSRFStrategy } from "@angular/http";

import { Progress } from "./interfaces";
import { ProgressBrowserXhrFactory } from "./ProgressBrowserXhrFactory";

@Injectable()
export class XHRBackendFactory {
    constructor(
        private responseOptions: ResponseOptions,
        private xsrfStrategy: XSRFStrategy,
        private progressBrowserXhrFactory: ProgressBrowserXhrFactory
    ) {}

    public create(
        upload:(progress:Progress) => void,
        download:(progress:Progress) => void): XHRBackend {
        const progressBrowserXhr = this.progressBrowserXhrFactory.create(upload, download);
        return new XHRBackend(progressBrowserXhr, this.responseOptions, this.xsrfStrategy);
    }
}