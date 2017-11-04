import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

import { HttpModule } from "@angular/http";

import { ProgressHttpModule, ProgressHttp } from "angular-progress-http";

describe("ProgressHttp Module", () => {
    let testBed;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                ProgressHttpModule
            ]
        });

        testBed = getTestBed();
    }));

    it("defines ProgressHttp service", () => {
        const progressHttp = testBed.get(ProgressHttp);

        expect(progressHttp).toBeDefined();
        expect(progressHttp).not.toBeNull();
    });
});
