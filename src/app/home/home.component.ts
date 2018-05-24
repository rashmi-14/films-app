import { Component, OnInit, Inject } from '@angular/core';
import { MovieService } from '../movie.service';
import * as Chart from 'chart.js';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search_all_result: any;
  popular_movies: any;
  upcoming_movies: any;
  search_result: any;
  movie: any;
  salmankhan_movies: any;

  constructor(
    public movieService: MovieService
  ) {
    this.movieService.getUpcomingMovies().subscribe(data => {
      console.log(data);
      this.upcoming_movies = data['results'];
   });

   this.movieService.getPopularMovies().subscribe(data => {
    this.popular_movies = data['results'];
   });

//    this.movieService.salman_movies().subscribe(data => {
//     this.salmankhan_movies = data['results'];
//    });
   }

   getAllMovies(){
    this.movieService.allMovies().subscribe(data => {
      this.search_all_result = data['results'];
      if(this.search_all_result != null){
      for(var i in this.search_all_result)
      {
          var list = this.search_all_result[i];
          var vote = list["vote_average"];
      if (vote > 0 && vote < 3){
          this.vote_array.push(3);
          this.moviesRank_array.push("Flop");
          }
      if (vote > 3 && vote < 6){
          this.vote_array.push(6);
          this.moviesRank_array.push("Average");
          }
      if (vote > 6 && vote < 10){
          this.vote_array.push(10);
          this.moviesRank_array.push("Hit");
          }
       
      }
    }

        var e = $("#movies_chart");
              if (0 != e.length) {
                  new Chart(e, {
                      type: 'pie',
                      data: {
                          datasets: [{
                              data: this.Vote,
                              backgroundColor: this.color_array,
                              label: 'Dataset 1'
                          }],
                          labels: this.Rank,
                      },
                      
                      options: {
                          responsive: true,
                          legend: {
                              position: 'left',
                          },
                      }
                      
                  });
              }
       });
       this.Rank = find_duplicate_in_array(this.moviesRank_array); 
       this.Vote = find_duplicate_in_array(this.vote_array); 
      }

   vote_array=[];
   moviesRank_array=[];
   color_array=["orangered","skyblue","gold"];
   Rank = [];
   Vote = [];

   searchMovies() {
    this.movieService.searchMovie(this.movie).subscribe(data => {
      this.search_result = data['results'];
       //console.log(this.search_result);

    });
  }

  ngOnInit() {

  }

}

function find_duplicate_in_array(arra1) {
  var i,
  len=arra1.length,
  result = [],
  obj = {}; 
  for (i=0; i<len; i++)
  {
  obj[arra1[i]]=0;
  }
  for (i in obj) {
  result.push(i);
  }
  return result;
  }