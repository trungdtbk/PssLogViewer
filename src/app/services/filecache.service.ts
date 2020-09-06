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
export class FilesCacheService {

  files;  

  constructor() {
    this.files = {};
  }

  process(files: File[]) {
    files.forEach(file => {
      if (!(file.name in this.files)) {
        console.log('fileservice process: ' + file.name);
        this.files[file.name] = new FileCache(file);
      }
    });
    // TODO: remove files from this.files if not exist in the files argument
  }

  getFiles() {
    return this.files;
  }

  updateFile(file: File, key: string, data: any) {
    const filecache = this.files[file.name];
    filecache?.updateCache(key, data);
  }

}
