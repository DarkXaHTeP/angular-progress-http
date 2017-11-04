import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

import "rxjs/add/operator/map";

import xhrMock from 'xhr-mock';

import { HttpModule } from "@angular/http";

import { ProgressHttpModule, ProgressHttp } from "angular-progress-http";

describe("ProgressHttp Service", () => {
    let progressHttp;

    beforeEach(async(() => {
        xhrMock.setup();

        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                ProgressHttpModule
            ]
        });

        const testBed = getTestBed();
        progressHttp = testBed.get(ProgressHttp);
    }));

    afterEach(() => {
        xhrMock.teardown();
    })

    it("performs get requests as usual Http", (done) => {
        xhrMock.get("/data", (req, res) => {
            res.body(JSON.stringify({
                field: "value"
            }));

            return res;
        });

        progressHttp
            .get("/data")
            .map(response => response.json())
            .subscribe(response => {
                expect(response.field).toEqual("value");
                done();
            })
    });
});