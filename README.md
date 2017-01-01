# angular-progress-http

A thin wrapper around Angular 2+ Http service that adds ability to work with upload/download progress

### npm
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

## Usage
Include HttpModule and ProgressHttpModule
``` js
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
Inject ProgressHttp into your component and make calls that are listed in the []API description below](#api-description).
``` js
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

TBD

## How it works internally

TBD

## Сontribution
Feel free to ask questions and post bugs/ideas in the issues, as well as send pull requests.

#### License: [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angular-progress-http.svg
[npm-url]: https://npmjs.org/package/angular-progress-http
[downloads-image]: https://img.shields.io/npm/dm/angular-progress-http.svg