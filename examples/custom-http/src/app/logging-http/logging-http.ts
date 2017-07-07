import { Injectable } from '@angular/core';
import { Http, Request, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class LoggingHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let address: string;
    if(typeof url === "string") {
      address = url;
    } else {
      address = url.url;
    }

    console.info(`Sending new request to url: ${address}`);
    console.debug("URL and Options are:", url, options);

    return super
      .request(url, options)
      .do(
        (response) => {
          console.info("Response received")
          console.debug("Response:", response);
        },
        (error) => {
          console.error("Error happaned");
          console.debug("Error is:", error);
        },
        () => {
          console.info("Request completed");
        }
      )
  }
}
