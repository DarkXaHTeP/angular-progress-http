import { ProgressBrowserXhr } from "./ProgressBrowserXhr";

describe("ProgressBrowserXhr", () => {
    describe("create", () => {
        let progressXhr: ProgressBrowserXhr;

        beforeEach(() => {
            progressXhr = ProgressBrowserXhr.create(null, null);
        })

        it("returns instance of ProgressXhr", () => {
            expect(progressXhr).toEqual(jasmine.any(ProgressBrowserXhr));
        })

        it("returns new instance each time", () => {
            const progressXhr2 = ProgressBrowserXhr.create(null, null);
            expect(progressXhr).not.toBe(progressXhr2);
        })
    })

    describe("build", () => {
        describe("returns", () => {
            let progressXhr: ProgressBrowserXhr;
            let xhr: XMLHttpRequest;

            beforeEach(() => {
                progressXhr = ProgressBrowserXhr.create(null, null);

                xhr = progressXhr.build();
            })

            it("instance of XMLHttpRequest", () => {

                expect(xhr).toEqual(jasmine.any(XMLHttpRequest));
            })

            it("new instance each time", () => {
                const xhr2 = progressXhr.build();

                expect(xhr).not.toBe(xhr2);
            })
        })

        describe("calls XMLHttpRequest addEventListener", () => {
            let spy: any;

            beforeEach(() => {
                spy = spyOn(XMLHttpRequest.prototype, "addEventListener");
            })

            it("never if created without callbacks")

            it("once with download callback")
        })
    })
})