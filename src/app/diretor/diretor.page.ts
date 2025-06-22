import { Component, OnInit } from '@angular/core';
import { Diretor } from './models/diretor.type';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { DiretorService } from './services/diretor.service';

@Component({
  selector: 'app-diretor',
  templateUrl: './diretor.page.html',
  styleUrls: ['./diretor.page.scss'],
  standalone: false
})
export class DiretorPage implements OnInit, ViewWillEnter  {

  diretorList: Diretor[] = []; 

  constructor(
    private diretorService: DiretorService, 
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ionViewWillEnter(): void {
    this.diretorService.getList().subscribe({
      next: (response) => {
        this.diretorList = response;
        
      },
      error: (error) => {
        alert('Erro ao carregar lista de diretores');
        console.error(error);
      }  
    });
  }

  ngOnInit() {}

  remove(diretor: Diretor) {
    this.alertController.create({
      header: 'Excluir Diretor',
      message: `Deseja excluir o Diretor ${diretor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.diretorService.remove(diretor).subscribe({
              next: (response) => {
                this.ionViewWillEnter();
                this.toastController.create({
                  message: `Diretor ${diretor.nome} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert(`Erro ao excluir diretor ${diretor.nome} \n${error.error.message}`);
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
