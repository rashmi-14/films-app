import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popular_movies: any;
  upcoming_movies: any;
  search_result: any;
  movie: any;


  constructor(public movieService: MovieService) {
    this.movieService.getUpcomingMovies().subscribe(data => {
      this.upcoming_movies = data['results'];
   });

   this.movieService.getPopularMovies().subscribe(data => {
    this.popular_movies = data['results'];
   });
  }

   searchMovies() {
    this.movieService.searchMovie(this.movie).subscribe(data => {
      this.search_result = data['results'];
      // console.log(this.search_result);
    });
  }

  ngOnInit() {
  }

}
