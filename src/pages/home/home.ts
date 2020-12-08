import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Movie } from "../../models/movie";
import { ResponseMovies } from "../../models/response-movies";
import { environment } from "../../environment";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage implements OnInit {
  movies: Movie[] = [];

  baseImageUrl: string;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    this.baseImageUrl = environment.baseImageUrl;
  }

  ngOnInit(): void {
    this.apiProvider.getPopularMovies().subscribe((movies: ResponseMovies) => {
      this.movies = movies.results;
      localStorage.setItem("movies", JSON.stringify(this.movies));
    });
  }

  openDetail(movie: Movie) {}
}
