import { Component, OnInit } from "@angular/core";
import { LoadingController, NavController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Movie } from "../../models/movie";
import { ResponseMovies } from "../../models/response-movies";
import { environment } from "../../environment";
import { Loading } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage implements OnInit {
  movies: Movie[] = [];
  baseImageUrl: string;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiProvider,
    public loadingController: LoadingController
  ) {
    this.baseImageUrl = environment.baseImageUrl;
    this.loading = this.loadingController.create({
      content: "Loading ,please wait...",
    });
  }

  ngOnInit(): void {
    this.loading.present();
    this.apiProvider.getPopularMovies().subscribe((movies: ResponseMovies) => {
      this.movies = movies.results;
      localStorage.setItem("movies", JSON.stringify(this.movies));
      this.loading.dismiss();
    });
  }

  openDetail(movie: Movie) {}
}
