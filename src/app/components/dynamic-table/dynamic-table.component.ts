import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnChanges {

  @Input() data: any = null;
  @Input() columns: Array<any> = [];
  @Input() columnDisplayList: Array<any> = [];

  @Input() ngSelectOptions: Array<any> = [];
  @Input() ngSelected: any = null;

  @Input() schoolCorrectingList: Array<any> = [];
  filteredSchoolCorrecting: Array<any> = [];
  @Output() onChangeSchoolCorrecting = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
      this.data.paginator = this.paginator;
    }
  }

  focusSchoolCorrecting(row) {
    this.filteredSchoolCorrecting = [];
    for (let i = 0; i < this.schoolCorrectingList.length; i++) {
      if (this.schoolCorrectingList[i].school._id == row.school_origin_id._id) {
        break;
      } else {
        this.filteredSchoolCorrecting.push(this.schoolCorrectingList[i]);
      }
    }
  }

  changeSchoolCorrecting(e, index) {
    let school_index = this.schoolCorrectingList.findIndex(x => x.school._id === e);
    var data = {
      index: index,
      school_index: school_index
    }
    this.onChangeSchoolCorrecting.emit(data);
  }

}
