import { Component, OnInit } from '@angular/core';
import { Filmes } from './models/filmes.type';
import { FilmesService } from './services/filmes.service';
import { AlertController, ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
  standalone: false
})

export class FilmesPage implements OnInit, ViewWillEnter {
  
  filmesList: Filmes[] = [];

  constructor(
    private filmesService: FilmesService, private alertController: AlertController,
  ) {}
  ionViewWillEnter(): void {
    this.filmesList = this.filmesService.getList();
  }

  ngOnInit() {}

  remove(filmes: Filmes) {
    this.alertController.create({
      header: 'Excluir Filme',
      message: `Deseja excluir o filme ${filmes.title}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.filmesService.remove(filmes);
            this.filmesList = this.filmesService.getList();
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

  
}
