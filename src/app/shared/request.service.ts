import { Injectable } from '@angular/core';
import { Request } from './request';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private api = 'http://gostudent.s1910456001.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Request>> {
    return this.http.get<Array<Request>>(`${this.api}/requests`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<Request> {
    return this.http.get<Request>(`${this.api}/requests/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getPendingRequestsByOfferId(id: string): Observable<Array<Request>> {
    return this.http.get<Request>(`${this.api}/getPendingRequestsByOfferId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getByUserIdAndOfferId(params: Request): Observable<Request> {
    console.log(params);
    return this.http.post<Request>(`${this.api}/getRequestsByUserIdAndOfferId`, params).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getByUserId(id: string): Observable<Array<Request>> {
    return this.http.get<Request>(`${this.api}/getByUserId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(request: Request): Observable<any> {
    return this.http.post(`${this.api}/requests`, request)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(request: Request): Observable<any> {
    return this.http.put(`${this.api}/requests/${request.id}`, request)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  acceptRequest(request: Request): Observable<any> {
    return this.http.put(`${this.api}/acceptRequest/${request.id}`, request)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/requests/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
