import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private _http: HttpClient;
  private _baseUrl: string;
  private _apiKey = "api_key=e93bb48535e8ca12c047ab10972bd4e8"
  private _searchUrl = "search/movie?" + this._apiKey + "&query=";
  
  constructor(http:HttpClient) { 
    this._http = http;
    this._baseUrl = "https://api.themoviedb.org/3/"
  }

  getMovies(txt:string){
    let source = this._baseUrl + this._searchUrl + txt;
    console.log(source);
    return this._http.get(source);
  }
  getMovie(id:number){
    let source = this._baseUrl + "movie/" + id.toString() + '?' + this._apiKey;
    console.log(source);
    return this._http.get(source);
  }
}
