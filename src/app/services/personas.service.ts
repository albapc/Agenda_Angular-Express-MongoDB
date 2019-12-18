import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Persona from '../classes/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  public endpoint = 'http://localhost:3000/api/personas';
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  // Add persona
  AddPersona(data: Persona): Observable<any> {
    let API_URL = `${this.endpoint}`;
    return this.http.post(API_URL, data)
        .pipe(
            catchError(this.errorMgmt)
        )
  }

  // Get all personas
  GetPersonas() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get persona
  GetPersona(id): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
    )
  }

  // Update persona
  UpdatePersona(id, data: Persona): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
    )
  }

  // Delete persona
  DeletePersona(id): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http.delete(API_URL).pipe(
        catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
