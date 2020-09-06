import { TestBed } from '@angular/core/testing';

import { FileserviceService } from './fileservice.service';

describe('FileserviceService', () => {
  let service: FileserviceService;
  let files = [
    new File([""], 'file-1'),
    new File([""], 'file-2')
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileserviceService);
  });

  it('should process the list of file', () => {
    service.process(files);
    expect(Object.keys(service.files)).toEqual(['file-1', 'file-2'])
  });

  it('should get the list of file', () => {
    service.process(files);
    const filecache = service.getFiles();
    expect(Object.keys(filecache)).toEqual(['file-1', 'file-2']);
  });

  it('should update file cache', () => {
    let file = new File([""], 'file-1');
    service.process(files);
    service.updateFile(file, 'key1', ['data1']);
    service.updateFile(file, 'key2', {data: 'data2'});
    const cache1 = service.getFiles()['file-1'].cache;
    expect(cache1['key1']).toEqual(['data1']);
    expect(cache1.key2).toEqual({data: 'data2'});
  });

  it('should not update file cache if file not exist', () => {
    service.process(files);
    service.updateFile(new File([""], 'file-3'), 'key1', 'data');
    expect(Object.keys(service.getFiles())).toEqual(['file-1', 'file-2']);
  })
});
