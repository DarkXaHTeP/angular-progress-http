import { Http } from "@angular/http";

export interface HttpWithUploadProgressListener extends Http {
    withDownloadProgressListener(listener: (event: ProgressEvent) => void): Http;
}