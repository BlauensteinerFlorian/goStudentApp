import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://gostudent.s1910456001.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.api}/users`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<any> {
    return this.http.post(`${this.api}/users`, user)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(user: User): Observable<any> {
    return this.http.put(`${this.api}/users/${user.id}`, user)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
