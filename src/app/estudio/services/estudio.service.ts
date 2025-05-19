import { Injectable } from "@angular/core";
import { Estudios } from "../../estudios/models/estudios.type";

@Injectable({
  providedIn: 'root'
})
export class EstudioService {
  private estudiosList: Estudios[] = [
    {
      id: 1,
      nome: 'Warner Bros. Pictures',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/1200px-Warner_Bros_logo.svg.png',
      sobre: 'Um dos maiores estúdios de cinema do mundo, fundado em 1923.',
      launchDate: new Date(1923, 3, 4),
      dono: 'Warner'
    },
    {
      id: 2,
      nome: 'Columbia Pictures',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Columbia_Pictures_logo.svg/1200px-Columbia_Pictures_logo.svg.png',
      sobre: 'Estúdio de cinema americano fundado em 1924.',
      launchDate: new Date(1924, 0, 10),
      dono: 'Sony'
    },
    {
      id: 3,
      nome: 'Paramount Pictures',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Paramount_Pictures_logo.svg/1200px-Paramount_Pictures_logo.svg.png',
      sobre: 'Um dos mais antigos estúdios de cinema dos Estados Unidos.',
      launchDate: new Date(1912, 4, 8),
      dono: 'Paramount'
    }
  ];

  constructor() {}

  getById(estudioId: number) {
    return this.estudiosList.find(e => e.id === estudioId);
  }

  getList() {
    return [...this.estudiosList];
  }

  private add(estudio: Estudios) {
    this.estudiosList = [...this.estudiosList, {
      ...estudio,
      id: this.getNextId()
    }];
  }

  private getNextId(): number {
    return Math.max(...this.estudiosList.map(e => e.id ?? 0)) + 1;
  }

  private update(estudio: Estudios) {
    this.estudiosList = this.estudiosList.map(e => e.id === estudio.id ? estudio : e);
  }

  save(estudio: Estudios) {
    if (estudio.id) {
      this.update(estudio);
    } else {
      this.add(estudio);
    }
  }

  remove(estudio: Estudios) {
    this.estudiosList = this.estudiosList.filter(e => e.id !== estudio.id);
  }
} 