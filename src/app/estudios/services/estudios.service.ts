import { Injectable } from '@angular/core';
import { Estudios } from '../models/estudios.type';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  private estudiosList: Estudios[] = [
   {
      id: 1,
      nome: 'Universal',
      sobre: 'A Universal Studios é um estúdio de cinema norte-americano de propriedade da Comcast e de sua subsidiária NBCUniversal.',
      launchDate: new Date(2006, 11, 16),
      dono: 'Comcast',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1wR_XeFh-hXmVk6MIj-kk6XTNy1eY7gYUUg&s', 
    },
    {
      id: 2,
          nome: 'Columbia Pictures',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsLMSwwATXbJoSPKgktusNNk1FbSrMqqYr6Q&s',
          sobre: 'Columbia Pictures Industries é uma produtora e distribuidora de filmes norte-americana e é um dos cinco maiores estúdios de cinema de Hollywood. ',
          launchDate: new Date(1924, 0, 10),
          dono: 'Sony'
    }
  ]
  constructor() { }
  
  getById(estudiosId: number){
      return this.estudiosList.find(f => f.id === estudiosId);
    }
  
    getList(){
      return [...this.estudiosList];
    }
  
    private add(estudios: Estudios){
      this.estudiosList = [...this.estudiosList, {
        ...estudios,
        id: this.getNextId()
      }];
    }
  
    private getNextId(): number {
      const MaxId = this.estudiosList.reduce((id, estudios) => {
        if(!!estudios.id && estudios?.id > id) {
          id = estudios.id;
        }
        return id;
      }, 0);
      return MaxId + 1;
    }
  
    private update(updatedEstudios: Estudios) {
      this.estudiosList = this.estudiosList.map(f => {
        return (f.id === updatedEstudios.id) ? updatedEstudios : f;
      });
    }
  
    save(estudios: Estudios){
      estudios.id ? this.update(estudios) : this.add(estudios);
    }
  
    remove(estudios: Estudios){
      this.estudiosList = this.estudiosList.filter(f => f.id !== estudios.id);
    }
  
}
