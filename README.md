# angular-progress-http

A thin wrapper around Angular 2+ Http service that adds ability to work with upload/download progress

### npm
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

### build info
[![Build Status](https://travis-ci.org/DarkXaHTeP/angular-progress-http.svg?branch=master)](https://travis-ci.org/DarkXaHTeP/angular-progress-http)
[![Coverage Status](https://coveralls.io/repos/DarkXaHTeP/angular-progress-http/badge.svg?branch=master&service=github)](https://coveralls.io/github/DarkXaHTeP/angular-progress-http?branch=master)

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

## Supported Angular versions
* Both Angular 4 and 5 are supported by the latest version
* Angular 2 is supported in v0.5.1. Use command `npm install angular-progress-http@0.5.1` to get it

## Releases
For release notes please see [CHANGELOG.md](https://github.com/DarkXaHTeP/angular-progress-http/blob/master/CHANGELOG.md)

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

## Using custom HTTP implementations
If you want to use custom Http service with progress you need to follow certain steps.
Let's review them on example of [ng2-adal library](https://www.npmjs.com/package/ng2-adal) - a library for accessing APIs restricted by Azure AD.
1. create factory class that will implement HttpFactory interface
```ts
interface HttpFactory {
    create<T extends Http>(backend: ConnectionBackend, requestOptions: RequestOptions): T;
}
```
This interface contains single method to create instances of class derived from Http.
The create method accepts ConnectionBackend and default RequestOptions which are always required for Http to make creation of factory easier.

Let's examine AuthHttp (Http implementation from ng2-adal) constructor to understand what dependencies it has:
```ts
constructor(http: Http, adalService: AdalService);
```
As you can see, it needs an instance of http service and adalService to work properly.
With this knowledge we can now create the factory class.

The factory for ng2-adal is quite simple and will look next way:
```ts
import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions } from "@angular/http";
import { AuthHttp, AdalService } from "ng2-adal/core";
import { HttpFactory, AngularHttpFactory } from "angular-progress-http";

@Injectable()
export class AuthHttpFactory implements HttpFactory {
  constructor(
    private adalService: AdalService,
    private angularHttpFactory: AngularHttpFactory
  ) {}

  public create(backend: ConnectionBackend, requestOptions: RequestOptions) {
    const http = this.angularHttpFactory.create(backend, requestOptions);
    return new AuthHttp(http, this.adalService);
  }
}

```

2. Register created factory as a provider in your application
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ProgressHttpModule, HTTP_FACTORY } from 'angular-progress-http';
import { AuthHttpModule } from "ng2-adal/core";
import { AuthHttpFactory } from "./ng2-adal.http.factory.service";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ProgressHttpModule,
    AuthHttpModule
  ],
  providers: [
    { provide: HTTP_FACTORY, useClass: AuthHttpFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
That's it.
Now each time when you will call methods of ProgressHttp it will use your custom http implementation internally and add progress listeners to it.


## Building from sources
1. Clone the repository to the local PC
2. Run
``` bash
npm install
npm run build
```
3. The built library can be found in "build" folder

## Running tests
1. Clone the repository to the local PC
2. Run
``` bash
npm install
npm test
```

## Running examples
There are two example projects at the moment
- basic example of upload progress functionality (examples/upload-download)
- an example that uses custom http implementation (examples/custom-http)

1. Make sure that you built library from sources as described [above](#building-from-sources)
2. Navigate to selected example folder
2. Run
``` bash
npm install
npm start
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