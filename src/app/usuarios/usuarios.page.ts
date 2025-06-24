import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { Usuarios } from './models/usuarios.type';
import { AuthService } from '../login/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Usuarios_Filmes } from './models/usuarios_filmes.type';
import { Usuarios_FilmesService } from './services/usuarios_filmes.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage implements OnInit, ViewWillEnter {
  usuariosFilmesList: Usuarios_Filmes[] = [];

  usuariosAtual: Usuarios | undefined;
  usuariosList: Usuarios[] = [];
  
  constructor(
    private usuariosService: UsuariosService,
    private usuarios_filmesService: Usuarios_FilmesService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {  }

  async ionViewWillEnter(): Promise<void> {
    this.carregarDadosUsuario();

    if (this.usuariosAtual?.id) {
    this.usuarios_filmesService.getByUsuario(this.usuariosAtual.id).subscribe({
      next: (response) => {
        this.usuariosFilmesList = response;
      },
      error: (err) => {
        console.error('Erro ao buscar filmes assistidos:', err);
      }
    });
  }}

  async carregarDadosUsuario() {
    try {
      const usuarioId = await this.authService.getUsuarioId();
      if (!usuarioId) {
        console.warn('Usuário não está logado.');
        this.router.navigate(['/login']);
        return;
      }

      this.usuariosAtual = await firstValueFrom(this.usuariosService.getById(usuarioId));

      // Se for admin, carrega todos os usuários
      if (this.usuariosAtual?.admin) {
        this.usuariosList = await firstValueFrom(this.usuariosService.getList());
      }

    } catch (err) {
      console.error('Erro ao carregar usuário:', err);
    }
  }

  async ngOnInit() {}

  remove(usuarios: Usuarios) {
    this.alertController.create({
      header: 'Excluir Usuário',
      message: `Deseja excluir o usuário ${usuarios.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.usuariosService.remove(usuarios).subscribe({
                next: (response) => {
                  this.ionViewWillEnter();
                  this.toastController.create({
                    message: `Usuário ${usuarios.name} excluído com sucesso!`,
                    duration: 3000,
                    color: 'secondary',
                    keyboardClose: true,
                  }).then(toast => toast.present());
                },
                error: (error) => {
                  alert(`Erro ao excluir usuário ${usuarios.name} \n${error.error.message}`);
                  console.error(error);
                }
              });
            }
          },
          'Não'
        ]
      }).then(alert => alert.present());
  }

  deslogar(){
    this.authService.logout().then(() => {
      this.usuariosAtual = undefined;
      this.router.navigate(['/login']);
    });
  }

}
