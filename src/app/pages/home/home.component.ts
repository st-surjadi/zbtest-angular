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
  studentTableColumnsDisplay = ['Students', 'School Origin', 'School Correcting', 'Cross Corrector'];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    try {
      this.getAllStudents();
    } catch (error) {
      console.log(error);
    }
  }

  async getAllStudents() {
    try {
      const res = this.api.getAllStudent().subscribe(data => {
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

}
