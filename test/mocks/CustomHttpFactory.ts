import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Http } from "@angular/http";
import { HttpFactory } from "angular-progress-http";

import { CustomHttp } from "./CustomHttp";

@Injectable()
export class CustomHttpFactory implements HttpFactory {
    public create(backend: ConnectionBackend, requestOptions: RequestOptions): Http {
        return new CustomHttp(backend, requestOptions);
    }
}
