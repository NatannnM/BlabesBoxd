import { Injectable } from "@angular/core";
import { Filmes } from "../models/filmes.type";
import { Diretor } from "../../diretor/models/diretor.type";
import { Estudios } from "../../estudios/models/estudios.type";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  
    private filmesList: Filmes[] = [
      {
        id: 1,
        title: '007 Cassino Royale',
        image: 'https://m.media-amazon.com/images/I/61IZyZAdEZL._AC_UF894,1000_QL80_.jpg',
        launchDate: new Date(2006, 11, 16),
        genre: ['Ação', 'Mistério'], 
        director: {
          id: 1,
          nome: 'Martin Campbell',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Martin_Campbell_%28cropped%29.jpg/800px-Martin_Campbell_%28cropped%29.jpg',
          sobre: 'Diretor neozelandês conhecido por dirigir filmes de ação como GoldenEye e Casino Royale.',
          launchDate: new Date(1943, 9, 24)
        },
        estudios: {
          id: 2,
          nome: 'Columbia Pictures',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsLMSwwATXbJoSPKgktusNNk1FbSrMqqYr6Q&s',
          sobre: 'Columbia Pictures Industries é uma produtora e distribuidora de filmes norte-americana e é um dos cinco maiores estúdios de cinema de Hollywood. ',
          launchDate: new Date(1924, 0, 10),
          dono: 'Sony'
        }
      },
      {
        id: 2,
        title: 'Blade Runner 2049',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9coXypexaMz06TKPZZYZGUonO-u80i-zPQ&s',
        launchDate: new Date(2017, 10, 5),
        genre: ['Ficção Científica', 'Drama'],
        director: {
          id: 2,
          nome: 'Denis Villeneuve',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Denis_Villeneuve_%283%29.jpg/800px-Denis_Villeneuve_%283%29.jpg',
          sobre: 'Diretor canadense conhecido por filmes como Arrival, Sicario e Dune.',
          launchDate: new Date(1967, 9, 3)
        },
        estudios: {
          id: 1,
          nome: 'Warner Bros. Pictures',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/1200px-Warner_Bros_logo.svg.png',
          sobre: 'Um dos maiores estúdios de cinema do mundo, fundado em 1923.',
          launchDate: new Date(1923, 3, 4),
          dono: 'Warner'
        }
      }
    ];

  constructor() {

  }

  getById(filmesId: number){
    return this.filmesList.find(f => f.id === filmesId);
  }

  getList(){
    return [...this.filmesList];
  }

  private add(filmes: Filmes){
    this.filmesList = [...this.filmesList, {
      ...filmes,
      id: this.getNextId()
    }];
  }

  private getNextId(): number {
    return Math.max(...this.filmesList.map(f => f.id ?? 0)) + 1;
  }

  save(filmes: Filmes){
    if (filmes.id) {
      this.update(filmes);
    } else {
      this.add(filmes);
    }
  }

  private update(filmes: Filmes){
    this.filmesList = this.filmesList.map(f => f.id === filmes.id ? filmes : f);
  }

  remove(filmes: Filmes){
    this.filmesList = this.filmesList.filter(f => f.id !== filmes.id);
  }
}
