import { Injectable } from "@angular/core";
import { Http, RequestOptions, ConnectionBackend} from "@angular/http";
import { HttpFactory } from "./interfaces";

@Injectable()
export class DefaultHttpFactory implements HttpFactory {
    public create(backend: ConnectionBackend, requestOptions: RequestOptions): Http {
        return new Http(backend, requestOptions);
    }
}