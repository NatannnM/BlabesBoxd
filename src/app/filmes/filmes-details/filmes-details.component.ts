import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Filmes } from '../models/filmes.type';
import { FilmesService } from '../services/filmes.service';
import { Diretor } from '../../diretor/models/diretor.type';
import { DiretorService } from '../../diretor/services/diretor.service';
import { Estudios } from '../../estudios/models/estudios.type';
import { EstudiosService } from '../../estudios/services/estudios.service';
import { GenerosService } from '../services/generos.service';
import { Generos } from '../models/generos.type';

@Component({
  selector: 'app-filmes-details',
  templateUrl: './filmes-details.component.html',
  styleUrls: ['./filmes-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class FilmesDetailsComponent implements OnInit {
  filmes!: Filmes;
  diretores: Diretor[] = [];
  estudios: Estudios[] = [];
  generos: Generos[] = [];

  constructor(
    private filmesService: FilmesService,
    private diretorService: DiretorService,
    private estudioService: EstudiosService,
    private generoService: GenerosService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const filmeId = this.activatedRoute.snapshot.params['filmesId'];
    this.filmesService.getById(filmeId).subscribe({
      next: (response) => {//continuar mostrar diretores, estudios e generos
        this.filmes = response;
      },
      error: (error) => {
        alert('Erro ao carregar filme');
        console.error(error);
      }  
    });

  }

  deleteFilme() {
    this.alertController.create({
      header: 'Excluir Filme',
      message: `Deseja excluir o filme ${this.filmes.title}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.filmesService.remove(this.filmes).subscribe({
                next: (response) => {
                  this.router.navigate(['/filmes']);
                  this.toastController.create({
                    message: `Filme ${this.filmes.title} excluído com sucesso!`,
                    duration: 3000,
                    color: 'secondary',
                    keyboardClose: true,
                  }).then(toast => toast.present());
                },
                error: (error) => {
                  alert(`Erro ao excluir filme ${this.filmes.title} \n${error.error.message}`);
                  console.error(error);
                }
              });
            }
          },
          'Não'
        ]
      }).then(alert => alert.present());
  }

} 