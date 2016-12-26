"use strict";

import {Component} from "@angular/core";
import { ProgressHttp } from "angular-progress-http";

interface FileDescriptor {
    name: string;
    file: File;
    uploaded: boolean;
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
        <div>
            Hello {{name}}
        </div>
        <input type="file" multiple (change)="onFilesSelected($event.target.files)"/>
        <br/>
        <div *ngFor="let fileD of files" [class.uploaded]="fileD.uploaded">{{fileD.name}}</div>
        <br/>
        <button type="button" (click)="upload()">Upload</button>
`})
export class AppComponent {
    public name:string = "John";
    public files: FileDescriptor[] = [];

    constructor(private http: ProgressHttp) {
    }

    public onFilesSelected(fileList: FileList) {
        this.files = Array.from(fileList).map((f: File): FileDescriptor => ({
            name: f.name,
            file: f,
            uploaded: false
        }))
    }

    public upload() {
        this.files.forEach(f => {
            let form = new FormData();
            form.append("file", f.file);

            this.http
                .withProgressListener(e => console.log(f.name, e))
                .post("/fileUpload", form)
                .subscribe((r) => {
                    f.uploaded = true;
                })
        });
    }
}