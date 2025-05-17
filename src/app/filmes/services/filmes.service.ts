import { Injectable } from "@angular/core";
import { Filmes } from "../models/filmes.type";

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
      },
      {
        id: 2,
        title: 'Blade Runner 2049',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9coXypexaMz06TKPZZYZGUonO-u80i-zPQ&s',
        launchDate: new Date(2017, 10, 5),
        genre: ['Ficção Científica', 'Drama'],
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
    const MaxId = this.filmesList.reduce((id, filmes) => {
      if(!!filmes.id && filmes?.id > id) {
        id = filmes.id;
      }
      return id;
    }, 0);
    return MaxId + 1;
  }

  private update(updatedFilmes: Filmes) {
    this.filmesList = this.filmesList.map(f => {
      return (f.id === updatedFilmes.id) ? updatedFilmes : f;
    });
  }

  save(filmes: Filmes){
    filmes.id ? this.update(filmes) : this.add(filmes);
  }

  remove(filmes: Filmes){
    this.filmesList = this.filmesList.filter(f => f.id !== filmes.id);
  }

  
}
