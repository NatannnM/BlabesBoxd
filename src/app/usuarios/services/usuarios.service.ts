import { Injectable } from "@angular/core";
import { Usuarios } from "../models/usuarios.type";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService{

  private readonly API_URL = 'http://localhost:3000/usuarios/';

  constructor(private http: HttpClient){}

  getById(usuariosId: string){
      return this.http.get<Usuarios>(`${this.API_URL}${usuariosId}`);
     }
    
  getList(){
    return this.http.get<Usuarios[]>(this.API_URL);
  }
  
  private add(usuarios: Usuarios){
    return this.http.post<Usuarios>(this.API_URL, usuarios);
  }
  
  private update(usuarios: Usuarios) {
    return this.http.put<Usuarios>(`${this.API_URL}${usuarios.id}`, usuarios);
  }
  
  save(usuarios: Usuarios){
    return usuarios.id ? this.update(usuarios) : this.add(usuarios);
  }
  
  remove(usuarios: Usuarios){
    return this.http.delete<Usuarios>(this.API_URL+usuarios.id);
  }
}