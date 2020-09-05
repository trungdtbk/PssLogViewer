import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let btnSelectFiles: HTMLElement;
  let files: any[] = [
    new File([""], 'test-file-name-1', {'lastModified': (new Date('2020-09-03 10:10:00')).getTime()}),
    new File([""], 'test-file-name-2', {'lastModified': (new Date('2020-09-04 10:10:00')).getTime()})
  ];
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        BrowserAnimationsModule,
        OverlayPanelModule,
        TableModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    btnSelectFiles = fixture.nativeElement.querySelector('#btnSelFiles');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the "SelectFiles" button', () => {
    expect(btnSelectFiles).not.toBe(null);
  });

  it('should show "Select Files" overlay when "Select Files" button clicked', () => {
    btnSelectFiles.click();
    fixture.detectChanges();
    const opSelFiles = fixture.nativeElement.querySelector('#selectfiles');
    expect(opSelFiles).not.toBe(null);
  });

  it('should add/show the list of files', () => {
    component.addFiles(files);
    btnSelectFiles.click();
    fixture.detectChanges();
    const opSelFiles = fixture.nativeElement.querySelector('#selectfiles');
    expect(opSelFiles.textContent.includes('test-file-name-1')).toBeTrue();
    expect(opSelFiles.textContent.includes('test-file-name-2')).toBeTrue();
  });

  it('should remove a file from the list', () => {
    component.addFiles(files);
    component.selectedFiles = [files[0]];
    component.removeFiles();
    btnSelectFiles.click();
    fixture.detectChanges();
    const opSelFiles = fixture.nativeElement.querySelector('#selectfiles');
    expect(opSelFiles.textContent.includes('test-file-name-1')).toBeFalse();
    expect(opSelFiles.textContent.includes('test-file-name-2')).toBeTrue();
  });

  it('should not remove a wrong file from the list', () => {
    component.addFiles(files);
    component.selectedFiles = [new File([""], 'test-file-name-3')];
    component.removeFiles();
    btnSelectFiles.click();
    fixture.detectChanges();
    const opSelFiles = fixture.nativeElement.querySelector('#selectfiles');
    expect(opSelFiles.textContent.includes('test-file-name-1')).toBeTrue();
    expect(opSelFiles.textContent.includes('test-file-name-2')).toBeTrue();
  })

});
