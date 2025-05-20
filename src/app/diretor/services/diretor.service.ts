import { Injectable } from '@angular/core';
import { Diretor } from '../models/diretor.type';

@Injectable({
  providedIn: 'root'
})
export class DiretorService {
private diretorList: Diretor[] = [
    {
    id: 1,
          nome: 'Martin Campbell',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRicTNpipgxNiTqSepj5mwKUcowB2liGwQVYA&s',
          sobre: 'Diretor neozelandês conhecido por dirigir filmes de ação como GoldenEye e Casino Royale.',
          launchDate: new Date(1943, 9, 24)
        },
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
