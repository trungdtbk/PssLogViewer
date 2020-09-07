import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableviewComponent } from './tableview.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

let cols = [
  { header: "ID", field: "id", hide: true, key: true },
  { header: "Col1", field: "col1" },
  { header: "Time", field: "time" },
];

let rows = [
  { id: 1, col1: 'col1-data1', time: new Date('2020-09-13 10:10:00') },
  { id: 2, col1: 'col1-data2', time: new Date('2020-09-14 10:10:00') }
];

describe('TableviewComponent', () => {
  let component: TableviewComponent;
  let fixture: ComponentFixture<TableviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableviewComponent ],
      imports: [
        FormsModule,
        TableModule,
        MultiSelectModule,
        ButtonModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableviewComponent);
    component = fixture.componentInstance;
    component.cols = cols;
    component.rows = rows;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data', () => {
    const trs = fixture.nativeElement.querySelectorAll('tr');
    const hdrs = trs[0].querySelectorAll('th');
    expect(hdrs.length).toEqual(3);
    expect(hdrs[0].textContent).toEqual("");
    expect(hdrs[1].textContent).toContain('Col1');
    expect(hdrs[2].textContent).toContain('Time');
    expect(trs[1].textContent).toContain('col1-data1');
    expect(trs[1].textContent).toContain('2020/09/13 10:10:00');
  })
});
