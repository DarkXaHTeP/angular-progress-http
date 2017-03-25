import { Component } from '@angular/core';
import { ProgressHttp } from 'angular-progress-http';

interface FileDescriptor {
  name: string;
  file: File;
  uploaded: boolean;
  percentage?: number;
}

@Component({
  selector: 'aph-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
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
