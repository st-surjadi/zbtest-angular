import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  studentData = new MatTableDataSource<any>();
  studentDataMaster = new MatTableDataSource<any>();
  studentTableColumns = ['students', 'school_origin', 'school_correcting', 'cross_corrector'];
  studentTableColumnsDisplay = [
    { name: 'Students', id_content: 1 },
    { name: 'School Origin', id_content: 1 },
    { name: 'School Correcting', id_content: 2 },
    { name: 'Cross Corrector', id_content: 3 },
  ];

  schoolCorrectingOptions = [];
  crossCorrectorOptions = [];
  correctorList = [];

  schoolData = new MatTableDataSource<any>();
  schoolTableColumns = ['short_name', 'students', 'correction', 'diff'];
  schoolTableColumnsDisplay = [
    { name: 'Schools', id_content: 1 },
    { name: 'Students', id_content: 1 },
    { name: 'Correction', id_content: 1 },
    { name: 'Diff', id_content: 4 },
  ];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    try {
      this.getAllStudents();
      this.getAllSchools();
      this.getAllCorrector();
      this.getAllSchoolData();
      this.getAllCorrectorData();
    } catch (error) {
      console.log(error);
    }
  }

  async getAllStudents() {
    try {
      const res = this.api.getAllStudents().subscribe(data => {
        this.studentDataMaster.data = data;
        this.studentData.data = data;
        this.studentData.data.forEach((e, index) => {
          e.students = `${e.student_id.first_name} ${e.student_id.last_name}`;
          e.school_origin = e.school_origin_id.short_name;
          this.studentDataMaster.data[index].students = e.students
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSchools() {
    try {
      const res = this.api.getAllSchools().subscribe(data => {
        this.schoolCorrectingOptions = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSchoolData() {
    try {
      const res = this.api.getAllSchoolData().subscribe(data => {
        this.schoolData.data = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCorrector() {
    try {
      const res = this.api.getAllCorrector().subscribe(data => {
        this.crossCorrectorOptions = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCorrectorData() {
    try {
      const res = this.api.getAllCorrectorData().subscribe(data => {
        this.correctorList = data;
        this.correctorList.forEach(e => {
          e.school_correcting_corrector_id.fullname = `${e.school_correcting_corrector_id.first_name} ${e.school_correcting_corrector_id.last_name}`
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeSchoolCorrecting(e) {
    let index = this.schoolData.data.findIndex(s => s.short_name === this.studentData.data[e.index].school_correcting_id.short_name || s._id === this.studentData.data[e.index].school_correcting_id._id);
    if (this.studentData.data[e.index].school_correcting_id.short_name && !this.studentData.data[e.index].school_correcting_id._id && this.schoolData.data[index].correction > 0) {
      this.schoolData.data[index].correction--;
    } else {
      this.schoolData.data[index].correction++;
    }
    if (e.school_index < 0) {
      this.studentData.data[e.index].school_correcting_id._id = null;
      this.studentData.data[e.index].school_correcting_id.short_name = null;
      this.studentData.data[e.index].school_correcting_corrector_id._id = null;
      this.studentData.data[e.index].school_correcting_corrector_id.first_name = null;
      this.studentData.data[e.index].school_correcting_corrector_id.last_name = null;
    } else {
      this.studentData.data[e.index].school_correcting_id.short_name = this.schoolCorrectingOptions[e.school_index].school.short_name;
    }
  }

  changeCrossCorrector(e) {
    if (e.corrector_index < 0) {
      this.studentData.data[e.index].school_correcting_corrector_id._id = null;
      this.studentData.data[e.index].school_correcting_corrector_id.first_name = null;
      this.studentData.data[e.index].school_correcting_corrector_id.last_name = null;
    } else {
      this.studentData.data[e.index].school_correcting_corrector_id.first_name = e.filtered_data[e.corrector_index].first_name;
      this.studentData.data[e.index].school_correcting_corrector_id.last_name = e.filtered_data[e.corrector_index].last_name;
    }
  }

  filterStudent(e) {
    let temp = [];
    if (e) {
      for (let i = 0; i < this.studentDataMaster.data.length; i++) {
        if (!this.studentDataMaster.data[i].students.toUpperCase().indexOf(e.toUpperCase())) {
          temp.push(this.studentDataMaster.data[i]);
        }
      }
      this.studentData.data = temp;
    } else {
      this.studentData.data = this.studentDataMaster.data;
    }
  }

  filterSchool(e) {
    let temp = [];
    if (e) {
      for (let i = 0; i < this.studentDataMaster.data.length; i++) {
        if (!this.studentDataMaster.data[i].school_origin.toUpperCase().indexOf(e.toUpperCase())) {
          temp.push(this.studentDataMaster.data[i]);
        }
      }
      this.studentData.data = temp;
    } else {
      this.studentData.data = this.studentDataMaster.data;
    }
  }

  filterCorrecting(e) {
    let temp = [];
    if (e) {
      for (let i = 0; i < this.studentDataMaster.data.length; i++) {
        if (this.studentDataMaster.data[i].school_correcting_id.short_name &&
          !this.studentDataMaster.data[i].school_correcting_id.short_name.toUpperCase().indexOf(e.toUpperCase())
        ) {
          temp.push(this.studentDataMaster.data[i]);
        }
      }
      this.studentData.data = temp;
    } else {
      this.studentData.data = this.studentDataMaster.data;
    }
  }

  filterCorrector(e) {
    let temp = [];
    if (e) {
      for (let i = 0; i < this.studentDataMaster.data.length; i++) {
        if (this.studentDataMaster.data[i].school_correcting_corrector_id.first_name &&
          this.studentDataMaster.data[i].school_correcting_corrector_id.last_name &&
          (!this.studentDataMaster.data[i].school_correcting_corrector_id.first_name.toUpperCase().indexOf(e.toUpperCase()) ||
            !this.studentDataMaster.data[i].school_correcting_corrector_id.last_name.toUpperCase().indexOf(e.toUpperCase()))
        ) {
          temp.push(this.studentDataMaster.data[i]);
        }
      }
      this.studentData.data = temp;
    } else {
      this.studentData.data = this.studentDataMaster.data;
    }
  }


}
