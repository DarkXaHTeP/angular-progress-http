import { Injectable } from "@angular/core";
import { BrowserXhr } from "@angular/http";
import { ProgressBrowserXhr } from "./ProgressBrowserXhr";
import { Progress } from "./interfaces";

@Injectable()
export class ProgressBrowserXhrFactory {
    constructor(private browserXhr: BrowserXhr) {}

    public create(
        upload:(progress:Progress) => void,
        download:(progress:Progress) => void): ProgressBrowserXhr {
        return new ProgressBrowserXhr(this.browserXhr, upload, download);
    }
}