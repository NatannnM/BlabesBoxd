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
      sobre: 'A Universal Studios é um estúdio de cinema norte-americano de propriedade da Comcast e de sua subsidiária NBCUniversal',
      launchDate: new Date(1912, 4, 30),
      dono: 'Comcast',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMWUZi_GO8aKWqh1WQejP4VxsGy9Yn2cq_GA&s', 
    },
    {
      id: 2,
      nome: 'Warner Bros.',
      sobre: 'A Warner Bros. é uma das maiores e mais antigas empresas de produção cinematográfica e televisiva dos Estados Unidos, conhecida por franquias como Harry Potter e DC Comics.',
      launchDate: new Date(1923, 3, 4),
      dono: 'Warner Bros. Discovery',
      image: 'https://images.seeklogo.com/logo-png/15/2/warner-bros-logo-png_seeklogo-151467.png', 
    },
    {
      id: 3,
      nome: 'Paramount Pictures',
      sobre: 'A Paramount Pictures é um dos principais estúdios de cinema de Hollywood, responsável por clássicos e franquias como Missão Impossível, Star Trek e Transformers.',
      launchDate: new Date(1912, 4, 8),
      dono: 'Paramount Global',
      image: 'https://static.poder360.com.br/2024/04/Paramount_Logo-848x477.jpg', 
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
