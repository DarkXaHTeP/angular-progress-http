import {BrowserXhr} from "@angular/http";

import { Progress } from "./interfaces";

export class ProgressBrowserXhr extends BrowserXhr {
    private constructor(
        private upload:any = null,
        private download:any = null) {
        super();
    }

    public build():any {
        const xhr = super.build();

        if(this.upload) {
            xhr.upload.addEventListener("progress", this.createProgressListener(this.upload));
        }

        if(this.download) {
            xhr.addEventListener("progress", this.createProgressListener(this.download));
        }

        return xhr;
    }

    private createProgressListener(listener: (progress:Progress) => void): (event:ProgressEvent) => void {
        return (event: ProgressEvent) => {
            const progress: Progress = {
                event,
                lengthComputable: event.lengthComputable,
                loaded: event.loaded
            };

            if(event.lengthComputable) {
                progress.total = event.total;
                progress.percentage = Math.round((event.loaded * 100 / event.total));
            }

            listener(progress);
        }
    }

    public static create(
        upload:(progress:Progress) => void,
        download:(progress:Progress) => void) {
        return new ProgressBrowserXhr(upload, download);
    }
}