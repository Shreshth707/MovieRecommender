import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FastapiService {

  private _http: HttpClient;
  private _baseUrl: string;

  constructor(http: HttpClient) {
    this._http = http;
    this._baseUrl = "https://shrouded-sands-84651.herokuapp.com//https://recommender-script.herokuapp.com"
  }

  getRecommendations(title:string){
    return this._http.get(this._baseUrl + "/recommendation?title=" + title );
  }

}
