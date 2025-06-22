import { Injectable } from "@angular/core";
import { Filmes } from "../models/filmes.type";
import { Diretor } from "../../diretor/models/diretor.type";
import { Estudios } from "../../estudios/models/estudios.type";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  
  private readonly API_URL = 'http://localhost:3000/filmes/';

  constructor(private http: HttpClient) { }

  getById(filmesId: string){
      return this.http.get<Filmes>(`${this.API_URL}${filmesId}`);
     }
    
  getList(){
    return this.http.get<Filmes[]>(this.API_URL);
  }
  
  private add(filmes: Filmes){
    return this.http.post<Filmes>(this.API_URL, filmes);
  }
  
  private update(filmes: Filmes) {
    return this.http.put<Filmes>(`${this.API_URL}${filmes.id}`, filmes);
  }
  
  save(filmes: Filmes){
    return filmes.id ? this.update(filmes) : this.add(filmes);
  }
  
  remove(filmes: Filmes){
    return this.http.delete<Filmes>(this.API_URL+filmes.id);
  }
}
