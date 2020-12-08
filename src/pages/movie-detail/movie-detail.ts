import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Movie } from "../../models/movie";
import { environment } from "../../environment";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-movie-detail",
  templateUrl: "movie-detail.html",
})
export class MovieDetailPage {
  movie: Movie = null;

  baseImageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.baseImageUrl = environment.baseImageUrl;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MovieDetailPage");
  }
}
