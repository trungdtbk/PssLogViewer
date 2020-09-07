import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})
export class TableviewComponent implements OnInit {

  @Input() rows: any[];
  @Input() cols: any[];

  _selectedColumns: any[];
  dataKey;

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  private initialize() {
    this._selectedColumns = [];
    if (this.cols && this.cols.length > 0) {
      this.cols.forEach(col => {
        if (!col.hide) { this._selectedColumns.push(col)}
        if (!this.dataKey && col.key) { this.dataKey = col.field }
      })
    }
  }

  isDate(val: any) {
    return val instanceof Date;
  }

}
