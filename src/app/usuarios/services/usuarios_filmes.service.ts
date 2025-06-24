import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuarios_Filmes } from "../models/usuarios_filmes.type";

@Injectable({
    providedIn: 'root'
})
export class Usuarios_FilmesService{
    private readonly API_URL = 'http://localhost:3000/usuarios_filmes/'

    constructor(private http: HttpClient){}

    getById(usuarios_filmesId: string){
          return this.http.get<Usuarios_Filmes>(`${this.API_URL}${usuarios_filmesId}`);
         }

    getByUsuario(usuariosId: string){
       return this.http.get<Usuarios_Filmes[]>(`${this.API_URL}/usuarios/${usuariosId}`);
    }     
        
    getList(){
      return this.http.get<Usuarios_Filmes[]>(this.API_URL);
    }

    private add(usuarios_filmes: Usuarios_Filmes){
        console.log(usuarios_filmes);
        return this.http.post<Usuarios_Filmes>(this.API_URL, usuarios_filmes);
      }
      
    private update(usuarios_filmes: Usuarios_Filmes) {
      return this.http.put<Usuarios_Filmes>(`${this.API_URL}${usuarios_filmes.id}`, usuarios_filmes);
    }
      
    save(usuarios_filmes: Usuarios_Filmes){
      return usuarios_filmes.id ? this.update(usuarios_filmes) : this.add(usuarios_filmes);
    }

    remove(usuarios_filmes: Usuarios_Filmes){
        return this.http.delete<Usuarios_Filmes>(this.API_URL+usuarios_filmes.id);
    }
}