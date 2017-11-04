import { Http } from "@angular/http";

import { Progress } from "./Progress";

export interface HttpWithUploadProgressListener extends Http {
    withDownloadProgressListener(listener: (progress: Progress) => void): Http;
}