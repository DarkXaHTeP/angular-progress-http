import { BrowserXhr } from "@angular/http";

import { MockXmlHttpRequest } from "./MockXmlHttpRequest";

export class MockBrowserXhr implements BrowserXhr {
    public xhr: MockXmlHttpRequest;

    constructor() {
        this.xhr = new MockXmlHttpRequest();
        this.xhr.upload = new MockXmlHttpRequest();
    }

    public build(): any {
        return this.xhr;
    }
}