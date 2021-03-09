import { Component, OnInit } from '@angular/core';

import {FastapiService} from '../services/FastApi/fastapi.service';
import {TmdbService} from '../services/TMDB/tmdb.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchText:string;
  searchedMovie:any;
  recommendedMovieList:any;
  waiting:any;
  recommendedWaiting:any;
  error_message:string;

  private _imageUrl = "https://image.tmdb.org/t/p/w500/";
  
  constructor(private _fastApiService: FastapiService,
    private _tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.waiting = 1;
    this.recommendedWaiting = 1;
    this.recommendedMovieList=[];
  }

  setVal(item){
    this.searchText = item.target.value;
  }

  resetValues(){
    this.recommendedMovieList = [];
    this.error_message = undefined;
  }

  getMovie(str:string){
    this.waiting = undefined;
      
    this._tmdbService.getMovies(str)
    .subscribe((data)=>{
      try{
        if(data['total_results']==0){
          console.log("Value does not exist")
          this.waiting = 1;
          throw new Error();
        }else{
          this.resetValues();
          this._tmdbService.getMovie(data['results'][0]['id']).subscribe((data)=>{
            this.searchedMovie = data;
            console.log(this.searchedMovie.title);
            this.getRecommendations();
            this.waiting = 1;
          });
        } 
      }catch(e){
        console.log("Error:" , e);
        this.error_message = "The Movie Cannot be Found. Please Check the Spelling";
        console.log(this.error_message);
      }
    });
  
  }

  getRecommendations(){
    this.recommendedWaiting = undefined;
    this._fastApiService.getRecommendations(this.searchedMovie['title'])
    .subscribe((movieList)=>{
      console.log(movieList)
      for (let obj in movieList){
        if(movieList[obj].toString()==this.searchedMovie.title.toLowerCase()){
          continue;
        } 
        this._tmdbService.getMovies(movieList[obj]).subscribe((data)=>{
          if(data['total_results']!=0){
            this.recommendedMovieList.push(data['results'][0]);    
          }
        });
      }
      this.recommendedWaiting = 1;
    });
  }

}
