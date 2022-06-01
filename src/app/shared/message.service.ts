import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { Message } from './message';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private api = 'http://gostudent.s1910456001.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(`${this.api}/messages`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.api}/messages/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getByOfferId(id: string): Observable<Array<Message>> {
    return this.http.get<Message>(`${this.api}/messages/getByOfferId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getByUserId(id: string): Observable<Array<Message>> {
    return this.http.get<Message>(`${this.api}/messages/getByUserId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(message: Message): Observable<any> {
    return this.http.post(`${this.api}/messages`, message)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(message: Message): Observable<any> {
    return this.http.put(`${this.api}/messages/${message.id}`, message)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/messages/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
