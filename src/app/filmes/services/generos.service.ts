import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Generos } from "../models/generos.type";
@Injectable({ providedIn: 'root' })
export class GenerosService {
    constructor(private http: HttpClient){}

    getGeneros(): Observable<Generos[]> {
        return this.http.get<Generos[]>('http://localhost:3000/generos')
    }
}