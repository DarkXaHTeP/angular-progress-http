import { Http } from "@angular/http";

export interface HttpWithDownloadProgressListener extends Http {
    withUploadProgressListener(listener: (event: ProgressEvent) => void): Http;
}