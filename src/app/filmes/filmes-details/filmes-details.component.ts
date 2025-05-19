import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Filmes } from '../models/filmes.type';
import { FilmesService } from '../services/filmes.service';
import { Diretor } from '../../diretor/models/diretor.type';
import { DiretorService } from '../../diretor/services/diretor.service';
import { Estudios } from '../../estudios/models/estudios.type';
import { EstudiosService } from '../../estudios/services/estudios.service';

@Component({
  selector: 'app-filmes-details',
  templateUrl: './filmes-details.component.html',
  styleUrls: ['./filmes-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FilmesDetailsComponent implements OnInit {
  filme: Filmes | undefined;
  diretor: Diretor | undefined;
  estudio: Estudios | undefined;

  constructor(
    private filmesService: FilmesService,
    private diretorService: DiretorService,
    private estudioService: EstudiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const filmeId = parseInt(this.activatedRoute.snapshot.params['filmesId']);
    if (filmeId) {
      this.filme = this.filmesService.getById(filmeId);
      if (this.filme?.director) {
        this.diretor = this.diretorService.getById(this.filme.director.id!);
      }
      if (this.filme?.estudios) {
        this.estudio = this.estudioService.getById(this.filme.estudios.id!);
      }
    }
  }

  editFilme() {
    if (this.filme?.id) {
      this.router.navigate(['/filmes/edit', this.filme.id]);
    }
  }

  deleteFilme() {
    if (this.filme) {
      this.filmesService.remove(this.filme);
      this.router.navigate(['/filmes']);
    }
  }

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toLocaleDateString('pt-BR');
    }
    return date;
  }
} 