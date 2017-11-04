import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

import "rxjs/add/operator/map";

import xhrMock from 'xhr-mock';

import { HttpModule } from "@angular/http";

import { ProgressHttpModule, ProgressHttp } from "angular-progress-http";

describe("ProgressHttp same as Http", () => {
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
    });

    it("performs get", (done) => {
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
            });
    });

    it("performs post", (done) => {
        xhrMock.post("/data", (req, res) => {
            expect(req.header("Content-Type")).toEqual("application/json");

            const body = JSON.parse(req.body());
            expect(body.field).toEqual("value");

            res.body("reply");
            return res;
        });

        progressHttp
            .post("/data", { field: "value" })
            .map(response => response.text())
            .subscribe((response) => {
                expect(response).toEqual("reply");
                done();
            });
    })
});