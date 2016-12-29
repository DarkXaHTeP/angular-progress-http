import { Http } from "@angular/http";

import { Progress } from "./progress";

export interface HttpWithDownloadProgressListener extends Http {
    withUploadProgressListener(listener: (progress: Progress) => void): Http;
}