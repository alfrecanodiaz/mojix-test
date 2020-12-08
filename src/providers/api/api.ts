import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ResponseMovies } from "../../models/response-movies";
import { of } from "rxjs/observable/of";
import { environment } from "../../environment";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  baseUrl: string;

  constructor(public httpClient: HttpClient) {
    console.log("New ApiProvider instance");
    this.baseUrl = environment.baseUrl;
  }

  getPopularMovies(): Observable<ResponseMovies> {
    const command = "popular";
    return this.httpClient.get<ResponseMovies>(this.baseUrl + command).pipe(
      tap((Movie) => console.log("Movies fetched!")),
      catchError(
        this.handleError<ResponseMovies>("Get movies", ResponseMovies.empty())
      )
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
