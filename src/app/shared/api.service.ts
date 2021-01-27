import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endPoint = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  value: Student;

  constructor(private http: HttpClient) { }

  AddStudent(student: Student): Observable<any> {
    return this.http.post(`${this.endPoint}/add-student`, student).pipe(catchError(this.errorManagment));
  }

  GetStudents() { return this.http.get(`${this.endPoint}`);}

  /*GetStudent(id: number): Observable<any> {
    return this.http.get(`${this.endPoint}/read-student/${id}`, { headers: this.headers}).pipe(map((res: Response)  => {
      return res || {};
    }), catchError(this.errorManagment));
  }*/

  UpdateStudent(id: number, student: Student): Observable<any> {
    return this.http.put(`${this.endPoint}/update-student/${id}`, student, { headers: this.headers}).pipe(catchError(this.errorManagment));
  }

  DeleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.endPoint}/delete-student/${id}`).pipe(catchError(this.errorManagment));
  }

  errorManagment(error: HttpErrorResponse) {
    const msg = error.error instanceof ErrorEvent ? error.error.message :  `Error code: ${error.status}\nMessage: ${error.message}`;
    return throwError(msg);
  }
}
