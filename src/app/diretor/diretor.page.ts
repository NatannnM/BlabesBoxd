import { Component, OnInit } from '@angular/core';
import { Diretor } from './models/diretor.type';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { DiretorService } from './services/diretor.service';

@Component({
  selector: 'app-diretor',
  templateUrl: './diretor.page.html',
  styleUrls: ['./diretor.page.scss'],
  standalone: false
})
export class DiretorPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave  {

  diretorList: Diretor[] = []; 
  constructor(private diretorService: DiretorService, private alertController: AlertController,

  ) { }
ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
    this.diretorList = this.diretorService.getList();
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }

  ngOnInit() {
  }
  remove(diretor: Diretor) {
    this.alertController.create({
      header: 'Excluir Diretor',
      message: `Deseja excluir o Diretor ${diretor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.diretorService.remove(diretor);
            this.diretorList = this.diretorService.getList();
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

}
