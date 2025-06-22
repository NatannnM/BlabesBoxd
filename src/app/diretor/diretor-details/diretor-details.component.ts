import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Diretor } from '../models/diretor.type';
import { DiretorService } from '../services/diretor.service';
import { Filmes } from '../../filmes/models/filmes.type';
import { FilmesService } from '../../filmes/services/filmes.service';

@Component({
  selector: 'app-diretor-details',
  templateUrl: './diretor-details.component.html',
  styleUrls: ['./diretor-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DiretorDetailsComponent implements OnInit {
  diretor!: Diretor;
  filmesDirigidos: Filmes[] = [];

  constructor(
    private diretorService: DiretorService,
    private filmesService: FilmesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const diretorId = this.activatedRoute.snapshot.params['diretorId'];
    this.diretorService.getById(diretorId).subscribe({
      next: (response) => {
        this.diretor = response;
      },
      error: (error) => {
        alert('Erro ao carregar diretor');
        console.error(error);
      }  
    });
    
  }

  /*private carregarFilmesDirigidos(diretorId: number) {
    const todosFilmes = this.filmesService.getList();
    this.filmesDirigidos = todosFilmes.filter(filme => 
      filme.director?.id === diretorId
    );
  }*/

  editDiretor() {
    return this.diretorService.save(this.diretor);
  }

  deleteDiretor() {
    return this.diretorService.remove(this.diretor);
  }


  /*verFilme(filmeId: number) {
    this.router.navigate(['/filmes', filmeId]);
  }*/
} 