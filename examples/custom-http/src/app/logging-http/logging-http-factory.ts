import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { HttpFactory } from 'angular-progress-http';

import { LoggingHttp } from './logging-http';

@Injectable()
export class LoggingHttpFactory implements HttpFactory {
    create(backend: ConnectionBackend, requestOptions: RequestOptions) {
        return new LoggingHttp(backend, requestOptions);
    }
}
