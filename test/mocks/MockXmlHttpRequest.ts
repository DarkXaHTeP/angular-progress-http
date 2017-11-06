export class MockXmlHttpRequest {
    public listener: (event: ProgressEvent) => void;
    public upload: MockXmlHttpRequest;

    public addEventListener(name: string, listener: (event: ProgressEvent) => void) {
        this.listener = listener;
    }
}
