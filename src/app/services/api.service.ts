import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStudents(): Observable<any> {
    return this.http.get('./assets/data/students-table-list.json');
  }

  getAllSchools(): Observable<any> {
    return this.http.get('./assets/data/school-list.json');
  }

  getAllCorrector(): Observable<any> {
    return this.http.get('./assets/data/school-corrector-list.json');
  }

  getAllCorrectorData(): Observable<any> {
    return this.http.get('./assets/data/corrector-list.json');
  }

  getAllSchoolData(): Observable<any> {
    return this.http.get('./assets/data/school-table-list.json');
  }

}
