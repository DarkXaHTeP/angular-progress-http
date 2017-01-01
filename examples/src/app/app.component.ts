import {Component} from "@angular/core";
import { ProgressHttp } from "angular-progress-http";

interface FileDescriptor {
    name: string;
    file: File;
    uploaded: boolean;
    percentage?: number;
}

@Component({
    selector: "example-app",
    styles:[
        `
            .uploaded {
                color: green;
            }
        `
    ],
    template: `
        <input type="file" multiple (change)="onFilesSelected($event.target.files)"/>
        <br/>
        <br/>
        <div *ngFor="let fileD of files" [class.uploaded]="fileD.uploaded">
            <div>{{fileD.name}}</div>
            <div *ngIf="fileD.percentage !== null">
                <div>Uploaded: {{fileD.percentage}}%</div>
                <div><progress [value]="fileD.percentage" max="100"></progress></div>                
            </div>
        </div>
        <br/>
        <button type="button" (click)="upload()">Upload</button>
`})
export class AppComponent {
    public files: FileDescriptor[] = [];

    constructor(private progressHttp: ProgressHttp) {
    }

    public onFilesSelected(fileList: FileList) {
        this.files = Array.from(fileList).map((f: File): FileDescriptor => ({
            name: f.name,
            file: f,
            uploaded: false,
            percentage: null
        }))
    }

    public upload() {
        this.files.forEach(f => {
            let form = new FormData();
            form.append("file", f.file);

            this.progressHttp
                .withUploadProgressListener(progress => { f.percentage = progress.percentage; })
                .post("/fileUpload", form)
                .subscribe((r) => {
                    f.uploaded = true;
                })
        });
    }
}