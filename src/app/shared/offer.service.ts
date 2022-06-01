import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { Offer } from './offer';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private api = 'http://gostudent.s1910456001.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getBySubjectId(id: string): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers/getBySubjectId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllOpen(){
    return this.http.get<Array<Offer>>(`${this.api}/offers/getAllOpen`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getbyUserId(id: string){
    return this.http.get<Array<Offer>>(`${this.api}/offers/getByUserId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getbyStudentId(id: string){
    return this.http.get<Array<Offer>>(`${this.api}/offers/getByStudentId/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/offers/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
