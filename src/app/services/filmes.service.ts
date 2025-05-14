import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filmes } from '../filmes/models/filmes.type';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
private readonly API_URL = 'http://localhost:3000/games';

  constructor(private http: HttpClient) { }

  getById(filmesId: string) {
    return this.http.get<Filmes>(`${this.API_URL}/${filmesId}`);
  }

  getList() {
    return this.http.get<Filmes[]>(this.API_URL)
  }

  private add(filmes: Filmes) {
    return this.http.post<Filmes>(this.API_URL, filmes);
  }
}
