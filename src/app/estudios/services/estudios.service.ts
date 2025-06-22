import { Injectable } from '@angular/core';
import { Estudios } from '../models/estudios.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  private readonly API_URL = 'http://localhost:3000/estudios/';

  constructor(private http: HttpClient) { }
  
  getById(estudiosId: string){
      return this.http.get<Estudios>(`${this.API_URL}${estudiosId}`);
     }
    
  getList(){
    return this.http.get<Estudios[]>(this.API_URL);
  }
  
  private add(estudios: Estudios){
    return this.http.post<Estudios>(this.API_URL, estudios);
  }
  
  /*private getNextId(): number {
    const MaxId = this.diretorList.reduce((id, diretor) => {
      if(!!diretor.id && diretor?.id > id) {
        id = diretor.id;
      }
      return id;
    }, 0);
    return MaxId + 1;
  }*/
  
  private update(estudios: Estudios) {
    return this.http.put<Estudios>(`${this.API_URL}${estudios.id}`, estudios);
  }
  
  save(estudios: Estudios){
    return estudios.id ? this.update(estudios) : this.add(estudios);
  }
  
  remove(estudios: Estudios){
    return this.http.delete<Estudios>(this.API_URL+estudios.id);
  }

}
