import { Progress } from "angular-progress-http";

describe('Jasmine', () => {
    it('runs true is true', () => expect(true).toBeTruthy());
    it("can access built lib", () => {
        const progress: Progress = {
            event: <any>{},
            lengthComputable: true,
            percentage: 34,
            loaded: 232,
            total: 350
        };
    })
});