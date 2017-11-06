import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

import "rxjs/add/operator/map";

import xhrMock from 'xhr-mock';

import {HttpModule} from "@angular/http";

import {ProgressHttpModule, ProgressHttp, HTTP_FACTORY} from "angular-progress-http";

import {CustomHttpFactory, CustomHttp} from "../mocks";

describe("ProgressHttp with custom Http Factory", () => {
    let testBed;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                ProgressHttpModule
            ],
            providers: [
                {provide: HTTP_FACTORY, useClass: CustomHttpFactory}
            ]
        });

        testBed = getTestBed();
    }));

    describe("calls factory create method when", () => {
        it("gets constructed", () => {
            spyOn(CustomHttpFactory.prototype, "create").and.callThrough();

            testBed.get(ProgressHttp);

            expect(CustomHttpFactory.prototype.create).toHaveBeenCalledTimes(1);

        });

        describe("listener", () => {
            let progressHttp;

            beforeEach(() => {
                progressHttp = testBed.get(ProgressHttp);
                spyOn(CustomHttpFactory.prototype, "create").and.callThrough();
            });

            it("is added to upload", () => {
                progressHttp
                    .withUploadProgressListener(() => {
                    });

                expect(CustomHttpFactory.prototype.create).toHaveBeenCalledTimes(1);
            });

            it("is added to download", () => {
                progressHttp
                    .withDownloadProgressListener(() => {
                    });

                expect(CustomHttpFactory.prototype.create).toHaveBeenCalledTimes(1);
            });

            it("is added to both", () => {
                progressHttp
                    .withUploadProgressListener(() => {
                    })
                    .withDownloadProgressListener(() => {
                    });

                expect(CustomHttpFactory.prototype.create).toHaveBeenCalledTimes(2);
            });
        });

    })

    describe("uses custom http methods when", () => {
        it("executes http calls", (done) => {
            xhrMock.setup();

            xhrMock.get("/data", (req, res) => {
                return res;
            });

            spyOn(CustomHttp.prototype, "request").and.callThrough();

            const progressHttp = testBed.get(ProgressHttp);

            progressHttp
                .get("/data")
                .subscribe(() => {
                    expect(CustomHttp.prototype.request).toHaveBeenCalledTimes(1);
                    done();
                });

            xhrMock.teardown();
        });
    });
});
