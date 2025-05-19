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
  diretor: Diretor | undefined;
  filmesDirigidos: Filmes[] = [];

  constructor(
    private diretorService: DiretorService,
    private filmesService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const diretorId = parseInt(this.activatedRoute.snapshot.params['diretorId']);
    if (diretorId) {
      this.diretor = this.diretorService.getById(diretorId);
      this.carregarFilmesDirigidos(diretorId);
    }
  }

  private carregarFilmesDirigidos(diretorId: number) {
    const todosFilmes = this.filmesService.getList();
    this.filmesDirigidos = todosFilmes.filter(filme => 
      filme.director?.id === diretorId
    );
  }

  editDiretor() {
    if (this.diretor?.id) {
      this.router.navigate(['/diretor/edit', this.diretor.id]);
    }
  }

  deleteDiretor() {
    if (this.diretor) {
      this.diretorService.remove(this.diretor);
      this.router.navigate(['/diretor']);
    }
  }

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toLocaleDateString('pt-BR');
    }
    return date;
  }

  verFilme(filmeId: number) {
    this.router.navigate(['/filmes', filmeId]);
  }
} 