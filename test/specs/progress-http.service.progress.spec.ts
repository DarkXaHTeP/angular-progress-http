import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

import "rxjs/add/operator/map";

import xhrMock from 'xhr-mock';

import { HttpModule } from "@angular/http";

import { ProgressHttpModule, ProgressHttp } from "angular-progress-http";

describe("ProgressHttp", () => {
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

        xhrMock.post("/data", (req, res) => {
            //res.header("Content-Length", "5");
            res.body("reply");
            return res;
        })
    }));

    afterEach(() => {
        xhrMock.teardown();
    });

    it("calls upload progress listener", (done) => {
        const uploadProgressListener = jasmine.createSpy("uploadProgress");

        progressHttp
            .withUploadProgressListener(uploadProgressListener)
            .post("/data", { field: "value" })
            .subscribe(() => {
                expect(uploadProgressListener).toHaveBeenCalled();
                done()
            });
    })
});