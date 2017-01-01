# angular-progress-http

A thin wrapper around Angular 2+ Http service that adds ability to work with upload/download progress

### npm
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

## Usage
Include HttpModule and ProgressHttpModule
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
Inject ProgressHttp into your component and you are ready to go. See [API description below](#api-description) for available methods.
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

## Changelog

v0.2.1

* Readme updated with API description and examples

v0.2.0

* First public release
* Contains service and ngModule for it
* Example in "examples" folder

## API description

TBD

## Progress interface
Both upload and download listeners accept single argument that implements Progress interface
``` ts
export interface Progress {
    event: ProgressEvent, //event emitted by XHR
    lengthComputable: boolean, //if false percentage and total are undefined
    percentage?: number, //percentage of work finished
    loaded: number, //amount of data loaded in bytes
    total?: number // amount of data total in bytes
}
```

## How it works internally
The library tries to rely on Angular code as much as possible instead of reimplementing the wheel.

It extends BrowserXhr class with logic that adds event listeners to XMLHttpRequest and executes progress listeners.
Other parts that are responsible for http calls (Http, XhrConnection, XhrBackend) are used as is,
which means that angular-progress-http will automatically receive fixes and new features from newer versions of angular/http

## Сontribution
Feel free to ask questions and post bugs/ideas in the issues, as well as send pull requests.

### License: [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angular-progress-http.svg
[npm-url]: https://npmjs.org/package/angular-progress-http
[downloads-image]: https://img.shields.io/npm/dm/angular-progress-http.svg