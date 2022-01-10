import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnChanges {

  @Input() name: any = null;
  @Input() data: any = null;
  @Input() columns: Array<any> = [];
  @Input() columnDisplayList: Array<any> = [];

  @Input() ngSelectOptions: Array<any> = [];
  @Input() ngSelected: any = null;

  @Input() schoolCorrectingList: Array<any> = [];
  filteredSchoolCorrecting: Array<any> = [];
  @Output() onChangeSchoolCorrecting = new EventEmitter();

  @Input() crossCorrectorList: Array<any> = [];
  filteredCrossCorrector: Array<any> = [];
  @Output() onChangeCrossCorrector = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.data.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
      console.log(this.data);
    }
  }

  focusSchoolCorrecting(row) {
    this.filteredSchoolCorrecting = [];
    for (let i = 0; i < this.schoolCorrectingList.length; i++) {
      if (this.schoolCorrectingList[i].school._id == row.school_origin_id._id) {
        continue;
      } else {
        this.filteredSchoolCorrecting.push(this.schoolCorrectingList[i]);
      }
    }
    console.log(this.filteredSchoolCorrecting);
  }

  changeSchoolCorrecting(e, index) {
    console.log(e);
    let school_index = this.schoolCorrectingList.findIndex(x => x.school._id === e);
    var data = {
      index: index,
      school_index: school_index,
      school_data: this.schoolCorrectingList[school_index]
    }
    this.onChangeSchoolCorrecting.emit(data);
  }

  changeCrossCorrector() {
    this.onChangeCrossCorrector.emit();
  }

  focusCorrector(row) {
    this.filteredCrossCorrector = [];
    if (row.school_correcting_id._id) {
      for (let i = 0; i < this.crossCorrectorList.length; i++) {
        if (this.crossCorrectorList[i].school._id == row.school_correcting_id._id) {
          this.filteredCrossCorrector = this.crossCorrectorList[i].cross_correctors;
        }
      }
    }
    console.log(this.filteredCrossCorrector);
  }

  changeCorrector(e, index) {
    let corrector_index = this.filteredCrossCorrector.findIndex(x => x._id === e);
    let data = {
      index: index,
      corrector_index: corrector_index,
      filtered_data: this.filteredCrossCorrector
    }
    this.onChangeCrossCorrector.emit(data);
  }

  clearSchoolCorrecting(e) {
    console.log(e);
  }

  calculateRemaining() {
    let counter = this.data.data.length;
    for (let i = 0; i < this.data.data.length; i++) {
      if (this.data.data[i].school_correcting_corrector_id._id) {
        counter--;
      }
    }
    return counter;
  }

}
