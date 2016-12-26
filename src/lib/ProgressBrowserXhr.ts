"use strict";

import {BrowserXhr} from "@angular/http";

export class ProgressBrowserXhr extends BrowserXhr {
    private constructor(
        private upload:(event:ProgressEvent) => void = null,
        private download:(event:ProgressEvent) => void = null) {
        super();
    }

    public build():any {
        const xhr = super.build();

        if(this.upload) {
            xhr.upload.addEventListener("progress", this.upload);
        }

        if(this.download) {
            xhr.addEventListener("progress", this.download);
        }

        return xhr;
    }

    public static create(
        upload:(event:ProgressEvent) => void = null,
        download:(event:ProgressEvent) => void = null) {
        return new ProgressBrowserXhr(upload, download);
    }
}