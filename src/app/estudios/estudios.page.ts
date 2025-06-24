import { Component, OnInit } from '@angular/core';
import { Estudios } from './models/estudios.type';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { EstudiosService } from './services/estudios.service';
import { Usuarios } from '../usuarios/models/usuarios.type';
import { AuthService } from '../login/services/auth.service';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.page.html',
  styleUrls: ['./estudios.page.scss'],
  standalone: false,
})
export class EstudiosPage implements OnInit, ViewWillEnter {
  usuariosAtual: Usuarios | undefined;
  estudiosList: Estudios[] = [];

  constructor(
    private estudiosService: EstudiosService,
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
    this.estudiosService.getList().subscribe({
      next: (response) => {
        this.estudiosList = response;
        
      },
      error: (error) => {
        alert('Erro ao carregar lista de estúdios');
        console.error(error);
      }  
    });
  }

  ngOnInit() { }

  remove(estudios: Estudios) {
      this.alertController.create({
        header: 'Excluir Estúdio',
        message: `Deseja excluir o Estúdio ${estudios.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.estudiosService.remove(estudios).subscribe({
                next: (response) => {
                  this.ionViewWillEnter();
                  this.toastController.create({
                    message: `Estúdio ${estudios.nome} excluído com sucesso!`,
                    duration: 3000,
                    color: 'secondary',
                    keyboardClose: true,
                  }).then(toast => toast.present());
                },
                error: (error) => {
                  alert(`Erro ao excluir estúdio ${estudios.nome} \n${error.error.message}`);
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
