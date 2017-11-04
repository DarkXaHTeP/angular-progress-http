import { Http, ConnectionBackend, RequestOptions } from "@angular/http";

export interface HttpFactory {
    create<T extends Http>(backend: ConnectionBackend, requestOptions: RequestOptions): T | Http;
}
