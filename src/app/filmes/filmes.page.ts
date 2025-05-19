import { Component, OnInit } from '@angular/core';
import { Filmes } from './models/filmes.type';
import { FilmesService } from './services/filmes.service';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
  standalone: false
})

export class FilmesPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {
  
  filmesList: Filmes[] = [];

  constructor(
    private filmesService: FilmesService, private alertController: AlertController,
  ) {}
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
    this.filmesList = this.filmesService.getList();
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
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

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toLocaleDateString('pt-BR');
    }
    return date;
  }
}
