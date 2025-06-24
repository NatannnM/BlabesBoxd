import { Component, OnInit } from '@angular/core';
import { Diretor } from './models/diretor.type';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { DiretorService } from './services/diretor.service';
import { AuthService } from '../login/services/auth.service';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { Usuarios } from '../usuarios/models/usuarios.type';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-diretor',
  templateUrl: './diretor.page.html',
  styleUrls: ['./diretor.page.scss'],
  standalone: false
})
export class DiretorPage implements OnInit, ViewWillEnter  {
  usuariosAtual: Usuarios | undefined;
  diretorList: Diretor[] = []; 

  constructor(
    private diretorService: DiretorService,
    private authService: AuthService,
    private usuariosService: UsuariosService,  
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async carregarDadosUsuario() {
    try {
      const usuarioId = await this.authService.getUsuarioId();
        if (!usuarioId) {
          return;
        }
      this.usuariosAtual = await firstValueFrom(this.usuariosService.getById(usuarioId));
            
    } catch(err){
      console.error('Erro ao carregar usuário:', err);
    }
  }

  ionViewWillEnter(): void {
    this.carregarDadosUsuario();
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
