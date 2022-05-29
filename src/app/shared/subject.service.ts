import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private api = 'http://gostudent.s1910456001.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.api}/subjects`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(subject: Subject): Observable<any> {
    return this.http.post(`${this.api}/subjects`, subject)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(subject: Subject): Observable<any> {
    return this.http.put(`${this.api}/subjects/${subject.id}`, subject)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
