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
      sobre: 'AAA',
      launchDate: new Date(2006, 11, 16),
      dono: 'SLa',
      image: 'https://m.media-amazon.com/images/I/61IZyZAdEZL._AC_UF894,1000_QL80_.jpg', 
    },
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
