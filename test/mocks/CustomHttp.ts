import { Injectable } from "@angular/core";
import { Http, Request, RequestOptionsArgs, Response, ConnectionBackend, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CustomHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }
}
