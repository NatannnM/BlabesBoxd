import { Injectable } from '@angular/core';
import { Diretor } from '../models/diretor.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiretorService {
  
  private readonly API_URL = 'http://localhost:3000/diretor/';

  constructor(private http: HttpClient) { }

  getById(diretorId: string){
    return this.http.get<Diretor>(`${this.API_URL}${diretorId}`);
   }
  
  getList(){
    return this.http.get<Diretor[]>(this.API_URL);
  }
  
  private add(diretor: Diretor){
    return this.http.post<Diretor>(this.API_URL, diretor);
  }
  
  private update(diretor: Diretor) {
    return this.http.put<Diretor>(`${this.API_URL}${diretor.id}`, diretor);
  }
  
  save(diretor: Diretor){
    return diretor.id ? this.update(diretor) : this.add(diretor);
  }
  
  remove(diretor: Diretor){
    return this.http.delete<Diretor>(this.API_URL+diretor.id);
  }
  
}
