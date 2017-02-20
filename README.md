# angular-progress-http

A thin wrapper around Angular 2+ Http service that adds ability to work with upload/download progress

### npm
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

### build info
[![Build Status](https://travis-ci.org/DarkXaHTeP/angular-progress-http.svg?branch=master)](https://travis-ci.org/DarkXaHTeP/angular-progress-http)

## Usage
Import HttpModule and ProgressHttpModule
``` ts
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { ProgressHttpModule } from "angular-progress-http";

@NgModule({
    imports: [
        HttpModule,
        ProgressHttpModule
    ]
})
export class AppModule {}
```
Inject ProgressHttp into your component and you are ready to go.
See [API description below](#api-description) for available methods.
``` ts
import {Component} from "@angular/core";
import { ProgressHttp } from "angular-progress-http";

@Component({})
export class AppComponent {
    constructor(private http: ProgressHttp) {
        const form = new FormData();
        form.append("data", "someValue or file");

        this.http
            .withUploadProgressListener(progress => { console.log(`Uploading ${progress.percentage}%`); })
            .withDownloadProgressListener(progress => { console.log(`Downloading ${progress.percentage}%`); })
            .post("/fileUpload", form)
            .subscribe((response) => {
                console.log(response)
            })
    }
}
```
The library is distributed as a set of .ts files, which means that you may need an appropriate loader to compile TypeScript code into JavaScript.
Angular CLI does this compilation automatically.

## Changelog
v0.2.2

* Added Travis CI for build and publishing to npm
* Updated examples build

v0.2.1

* Readme updated with API description and examples

v0.2.0

* First public release
* Contains service and ngModule for it
* Example in "examples" folder

## API description

ProgressHttp service extends Http service provided by Angular/Http which means that you get all of the Http methods including
``` ts
request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
get(url: string, options?: RequestOptionsArgs): Observable<Response>;
post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
```
and others.

In addition it provides two methods for handling progress:
``` ts
withDownloadProgressListener(listener: (progress: Progress) => void): HttpWithDownloadProgressListener;
withUploadProgressListener(listener: (progress: Progress) => void): HttpWithUploadProgressListener;
```
They both take callback as argument and return new instances of the service.

The interfaces returned from methods are described below:
``` ts
interface HttpWithDownloadProgressListener extends Http {
    withUploadProgressListener(listener: (progress: Progress) => void): Http;
}

interface HttpWithUploadProgressListener extends Http {
    withDownloadProgressListener(listener: (progress: Progress) => void): Http;
}
```
Their purpose is to make libary easier to use and add compile-time checks for method calls
``` ts
progressHttp //can use http api or call withUploadProgressListener or withDownloadProgressListener
    .withUploadProgressListener(progress => {}) //can use http api or call withDownloadProgressListener
    .withDownloadProgressListener(progress => {}) //here and on lines below can only use http api
    .post("/fileUpload", form)
    .subscribe((response) => {})
```
This restriction is used to make sure that there are now repeating calls to add progress listeners that will overwrite previously assigned handlers and may confuse developer

Calls to both methods are immutable (return new instances and do not change the internal state of the service), so you may do next things
``` ts
let http1 = this.progressHttp.withUploadProgressListener(progress => { console.log("Uploading 1") });
let http2 = this.progressHttp.withUploadProgressListener(progress => { console.log("Uploading 2") });
let http3 = http1.withDownloadProgressListener(progress => { console.log("Downloading 1") });
```
In the code above http1 and http2 will have different upload listeners. http3 will have same upload listener as http1 and a download listener

This behavior may be useful when uploading multiple files simultaneously e.g.
``` ts
this.files.forEach(f => {
    const form = new FormData();
    form.append("file", f.file);

    this.progressHttp
        .withUploadProgressListener(progress => { f.percentage = progress.percentage; })
        .post("/fileUpload", form)
        .subscribe((r) => {
            f.uploaded = true;
        })
});
```

## Progress interface
Both upload and download progress listeners accept single argument that implements Progress interface
``` ts
interface Progress {
    event: ProgressEvent, //event emitted by XHR
    lengthComputable: boolean, //if false percentage and total are undefined
    percentage?: number, //percentage of work finished
    loaded: number, //amount of data loaded in bytes
    total?: number // amount of data total in bytes
}
```

## How it works internally
The library tries to rely on Angular code as much as possible instead of reinventing the wheel.

It extends BrowserXhr class with logic that adds event listeners to XMLHttpRequest and executes progress listeners.
Other parts that are responsible for http calls (Http, XhrConnection, XhrBackend) are used as is,
which means that angular-progress-http will automatically receive fixes and new features from newer versions of angular/http

## Building from sources
1. Clone the repository to the local PC
2. Run
``` bash
npm install
npm run build
```
3. The built library can be found in "build" folder

## Running tests
Tests are WIP. The instruction will be added after adding tests.

## Running examples
1. Make sure that you built library from sources as described [above](#building-from-sources)
2. Run
``` bash
npm run examples
```
4. Open browser on http://localhost:3000
5. Choose some files (big size of the files will let you see the progress bar) and click upload
6. Use throttling in Chrome dev tools to slow down network if progress jumps from 0 to 100 immediately

## Сontribution
Feel free to ask questions and post bugs/ideas in the issues, as well as send pull requests.

### License: [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angular-progress-http.svg
[npm-url]: https://npmjs.org/package/angular-progress-http
[downloads-image]: https://img.shields.io/npm/dm/angular-progress-http.svg