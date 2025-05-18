import { Component, OnInit } from '@angular/core';
import { Estudios } from './models/estudios.type';
import { AlertController } from '@ionic/angular';
import { EstudiosService } from './services/estudios.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.page.html',
  styleUrls: ['./estudios.page.scss'],
  standalone: false,
})
export class EstudiosPage implements OnInit {

  estudiosList: Estudios[] = [];
  constructor(private estudiosService: EstudiosService, private alertController: AlertController,) { }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
    this.estudiosList = this.estudiosService.getList();
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }

  ngOnInit() {
  }
  remove(estudios: Estudios) {
      this.alertController.create({
        header: 'Excluir Estudio',
        message: `Deseja excluir o Estudio ${estudios.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.estudiosService.remove(estudios);
              this.estudiosList = this.estudiosService.getList();
            }
          },
          'Não'
        ]
      }).then(alert => alert.present());
    }

}
