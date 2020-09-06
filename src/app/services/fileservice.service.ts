import { Injectable } from '@angular/core';

export class FileCache {
  file: File;
  cache: any;

  constructor(file: File) {
    this.file = file;
    this.cache = {};
  }

  updateCache(key, data) {
    this.cache[key] = data
  }
}

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  files;  

  constructor() {
    this.files = {};
  }

  process(files: File[]) {
    files.forEach(file => {
      this.files[file.name] = new FileCache(file);
    })
  }

  getFiles() {
    return this.files;
  }

  updateFile(file: File, key: string, data: any) {
    const filecache = this.files[file.name];
    filecache?.updateCache(key, data);
  }

}
