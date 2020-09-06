import { Component, OnInit } from '@angular/core';
import { FilesCacheService } from '../services/filecache.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  files: any[];
  selectedFiles: any[];

  constructor(private fileservice: FilesCacheService) { }

  ngOnInit(): void {
    this.files = [];
  }

  parseFiles() {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.fileservice.process(this.selectedFiles);
    }
  }

  addFiles(files: File[]) {
    let formated: any[] = [];
    for(let file of files) {
      formated.push({
        name: file.name,
        size: file.size,
        date: new Date(file.lastModified).toLocaleString(),
        file: file,
      })
    }
    this.files = this.files.concat(formated);
  }

  removeFiles() {
    for(let file of this.selectedFiles) {
      for(let i=0; i< this.files.length; i++) {
        if (this.files[i].name == file.name) {
          this.files.splice(i, 1);
          break;
        }
      }
    }
  }

}
