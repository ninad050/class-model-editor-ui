
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";




@Injectable()
export class HttpService {

  constructor(private http: Http) { }
  
  getClassJson(): Observable<JSON> {
        return this.http.get('assets/json/class.json').pipe(map(response=> response.json())).pipe(catchError(this.handleError));
    }

  public getMessage(): Observable<JSON> {
      return this.http.get("http://localhost:8080/api/hello")
      .pipe(map(response => {
          return response.json();
      },
      error => {
          console.error(error);
      }
    ))
  }
  public getFiles(): Observable<JSON> {
    return this.http.get("http://localhost:8080/api/list")
    .pipe(map(response => {
        return response.json();
    },
    error => {
        console.error(error);
    }
  ))
}

public readFile(filename): Observable<JSON> {
    alert(filename)
    return this.http.get("http://localhost:8080/api/readFile/" + filename)
    .pipe(map(response => {
        return response.json();
    },
    error => {
        console.error(error);
    }
  ))
}
  private handleError(error: Response | any) {

        console.error("error HttpService " + error.status);
        return observableThrowError(error);

    }    
}
