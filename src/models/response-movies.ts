import { Movie } from "./movie";

export class ResponseMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;

  public static empty(): ResponseMovies {
    let response: ResponseMovies = new ResponseMovies();
    response.results = [];
    return response;
  }
}
