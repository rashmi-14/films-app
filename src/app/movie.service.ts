import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operator/map';

@Injectable()
export class MovieService {

  private movie_url = 'https://api.themoviedb.org/3/';
  private api_key = '781d0e35821a3042462a7bf02b224a44';
  private movie_string: string;
  private id: number;

  constructor(public _http: HttpClient) { }

  allMovies() {
    return this
    ._http.get(this.movie_url + 'discover/movie?primary_release_date.gte=2017-05-24&primary_release_date.lte=2018-05-24&api_key=' + this.api_key);
  }

  searchMovie(movie: string) {
    this.movie_string = movie;
    return this
    ._http.get(this.movie_url + 'search/movie?query=' + this.movie_string + '&api_key=' + this.api_key);
  }

  getUpcomingMovies() {

    return this
    ._http.get(this.movie_url + `discover/movie?primary_release_date.gte=2018-05-21&
            primary_release_date.lte=2018-07-31&api_key=`+ this.api_key);

  }

  getPopularMovies() {
    return this
    ._http.get(this.movie_url + 'discover/movie?sort_by=popularity.desc' + '&api_key=' + this.api_key);
    
  }

  getMovie(id: number) {
    return this._http.get(this.movie_url + 'movie/' + id + '?api_key=' + this.api_key);
  }
  // salman_movies() {
  //   return this
  //   ._http.get(this.movie_url + 'find/person?name=salman+khan' + '&api_key=' + this.api_key);
  // }

}
