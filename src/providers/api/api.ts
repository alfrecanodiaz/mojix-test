import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ResponseMovies } from "../../models/response-movies";
import { of } from "rxjs/observable/of";
import { environment } from "../../environment";
import { Movie } from "../../models/movie";

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

  getDetail(movie: Movie): Observable<Movie> {
    const command = `movie/${movie.id}`;
    return this.httpClient.get<Movie>(this.baseUrl + command).pipe(
      tap((Movie) => console.log("Movie fetched!")),
      catchError(this.handleError<Movie>("Get movie", new Movie()))
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
