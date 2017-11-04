import { Http } from "@angular/http";

import { Progress } from "./Progress";

export interface HttpWithDownloadProgressListener extends Http {
    withUploadProgressListener(listener: (progress: Progress) => void): Http;
}