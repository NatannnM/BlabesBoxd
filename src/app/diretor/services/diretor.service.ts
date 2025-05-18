import { Injectable } from '@angular/core';
import { Diretor } from '../models/diretor.type';

@Injectable({
  providedIn: 'root'
})
export class DiretorService {
private diretorList: Diretor[] = [
    {
      id: 1,
      nome: 'Lamine Yamal',
      image: 'https://tmssl.akamaized.net//images/foto/galerie/lamine-yamal-fc-barcelona-2024-25-1745911357-166797.jpg',
      launchDate: new Date(2007, 7, 13),
      sobre: 'Diretor do filme, Messi na conta secundaria', 
    },
    {
      id: 2,
      nome: 'Vini Jr',
      image: 'https://img.uefa.com/imgml/TP/players/1/2025/324x324/250121533.jpg',
      launchDate: new Date(2000, 7, 12),
      sobre: 'Diretor do filme, A Malvadeza do drible', 
    }
  ];
  constructor() { }
   getById(diretorId: number){
      return this.diretorList.find(f => f.id === diretorId);
    }
  
    getList(){
      return [...this.diretorList];
    }
  
    private add(diretor: Diretor){
      this.diretorList = [...this.diretorList, {
        ...diretor,
        id: this.getNextId()
      }];
    }
  
    private getNextId(): number {
      const MaxId = this.diretorList.reduce((id, diretor) => {
        if(!!diretor.id && diretor?.id > id) {
          id = diretor.id;
        }
        return id;
      }, 0);
      return MaxId + 1;
    }
  
    private update(updatedDiretor: Diretor) {
      this.diretorList = this.diretorList.map(f => {
        return (f.id === updatedDiretor.id) ? updatedDiretor : f;
      });
    }
  
    save(diretor: Diretor){
      diretor.id ? this.update(diretor) : this.add(diretor);
    }
  
    remove(diretor: Diretor){
      this.diretorList = this.diretorList.filter(f => f.id !== diretor.id);
    }
  
}
