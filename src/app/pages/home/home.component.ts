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
  studentTableColumns = ['students', 'school_origin', 'school_correcting', 'cross_corrector'];
  studentTableColumnsDisplay = [
    { name: 'Students', id_content: 1 },
    { name: 'School Origin', id_content: 1 },
    { name: 'School Correcting', id_content: 2 },
    { name: 'Cross Corrector', id_content: 3 },
  ];

  schoolCorrectingOptions = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    try {
      this.getAllStudents();
      this.getAllSchools();
    } catch (error) {
      console.log(error);
    }
  }

  async getAllStudents() {
    try {
      const res = this.api.getAllStudents().subscribe(data => {
        this.studentData.data = data;
        this.studentData.data.forEach(e => {
          e.students = `${e.student_id.first_name} ${e.student_id.last_name}`;
          e.school_origin = e.school_origin_id.short_name;
        });
        console.log(this.studentData.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSchools() {
    try {
      const res = this.api.getAllSchools().subscribe(data => {
        this.schoolCorrectingOptions = data;
        console.log(this.schoolCorrectingOptions);
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeSchoolCorrecting(e) {
    console.log(e);
    this.studentData.data[e.index].school_correcting_id.short_name = this.schoolCorrectingOptions[e.school_index].school.short_name;
  }

}
