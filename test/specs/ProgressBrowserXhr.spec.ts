import { Progress } from "angular-progress-http";
import { ProgressBrowserXhr } from "../../src/xhr/ProgressBrowserXhr";

import { MockBrowserXhr } from "../mocks";

describe("ProgressBrowserXhr", () => {
    let mockBrowserXhr;

    beforeEach(() => {
        mockBrowserXhr = new MockBrowserXhr();
    });

    it("calls build on passed browserXhr", () => {
        spyOn(mockBrowserXhr, "build").and.callThrough();

        const progressBrowserXhr = new ProgressBrowserXhr(mockBrowserXhr, null, null);
        progressBrowserXhr.build();

        expect(mockBrowserXhr.build).toHaveBeenCalledTimes(1);
    });

    describe("adds listener to xhr when", () => {
        it("receives upload callback", () => {
            spyOn(mockBrowserXhr.xhr.upload, "addEventListener").and.callThrough();

            const progressBrowserXhr = new ProgressBrowserXhr(mockBrowserXhr, () => {}, null);

            progressBrowserXhr.build();

            expect(mockBrowserXhr.xhr.upload.listener).toBeDefined();
            expect(mockBrowserXhr.xhr.upload.addEventListener).toHaveBeenCalledTimes(1);
        });

        it("receives download callback", () => {
            spyOn(mockBrowserXhr.xhr, "addEventListener").and.callThrough();

            const progressBrowserXhr = new ProgressBrowserXhr(mockBrowserXhr, null, () => {});

            progressBrowserXhr.build();

            expect(mockBrowserXhr.xhr.listener).toBeDefined();
            expect(mockBrowserXhr.xhr.addEventListener).toHaveBeenCalledTimes(1);
        });
    });

    describe("creates correct listener and", () => {
        describe("sets Progress fields when", () => {
            it("receives event with computable length", (done) => {
                executeListenerTest({
                    lengthComputable: true,
                    loaded: 1,
                    total: 2
                },
                (progress) => {
                    expect(progress.lengthComputable).toBeTruthy();
                    expect(progress.loaded).toEqual(1);
                    expect(progress.total).toEqual(2);
                    expect(progress.percentage).toBeDefined();
                    done();
                });
            });

            it("receives event without computable length", (done) => {
                executeListenerTest({
                        lengthComputable: false,
                        loaded: 1
                    },
                    (progress) => {
                        expect(progress.lengthComputable).toBeFalsy();
                        expect(progress.loaded).toEqual(1);
                        expect(progress.total).toBeUndefined()
                        expect(progress.percentage).toBeUndefined();

                        done();
                    });
            });
        });

        describe("sets percentage when", () => {
            it("receives event with 0 loaded", (done) => {
                executeListenerTest({
                    lengthComputable: true,
                    loaded: 0,
                    total: 10
                },
                (progress) => {
                    expect(progress.percentage).toEqual(0);

                    done();
                });
            });

            it("receives event with quarter loaded", (done) => {
                executeListenerTest({
                        lengthComputable: true,
                        loaded: 1,
                        total: 4
                    },
                    (progress) => {
                        expect(progress.percentage).toEqual(25);

                        done();
                    });
            });

            it("receives event with half loaded", (done) => {
                executeListenerTest({
                        lengthComputable: true,
                        loaded: 2,
                        total: 4
                    },
                    (progress) => {
                        expect(progress.percentage).toEqual(50);

                        done();
                    });
            });

            it("receives event with all loaded", (done) => {
                executeListenerTest({
                        lengthComputable: true,
                        loaded: 4,
                        total: 4
                    },
                    (progress) => {
                        expect(progress.percentage).toEqual(100);

                        done();
                    });
            });
        });

        function executeListenerTest(progressEventInit: ProgressEventInit, listener: (progress: Progress) => void) {
            const event = new ProgressEvent("progress", progressEventInit);

            const progressBrowserXhr = new ProgressBrowserXhr(
                mockBrowserXhr,
                listener,
                null);

            progressBrowserXhr.build();

            mockBrowserXhr.xhr.upload.listener(event);
        };
    });
});