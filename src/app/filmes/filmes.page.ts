import { Component, OnInit } from '@angular/core';
import { Filmes } from './models/filmes.type';
import { FilmesService } from './services/filmes.service';
import { AlertController, ToastController, ViewWillEnter} from '@ionic/angular';
import { Usuarios } from '../usuarios/models/usuarios.type';
import { AuthService } from '../login/services/auth.service';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
  standalone: false
})

export class FilmesPage implements OnInit, ViewWillEnter {
  usuariosAtual: Usuarios | undefined;
  filmesList: Filmes[] = [];

  constructor(
    private filmesService: FilmesService, 
    private authService: AuthService,
    private router: Router,
    private usuariosService: UsuariosService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

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
    this.filmesService.getList().subscribe({
      next: (response) => {
        this.filmesList = response;
        
      },
      error: (error) => {
        alert('Erro ao carregar lista de filmes');
        console.error(error);
      }  
    });
  }

  ngOnInit() {}

  assistido(filmes: Filmes) {
    this.router.navigate(['/filmes', 'assistido', filmes.id]);
  }

  remove(filmes: Filmes) {
    this.alertController.create({
      header: 'Excluir Filme',
      message: `Deseja excluir o filme ${filmes.title}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.filmesService.remove(filmes).subscribe({
                next: (response) => {
                  this.ionViewWillEnter();
                  this.toastController.create({
                    message: `Filme ${filmes.title} excluído com sucesso!`,
                    duration: 3000,
                    color: 'secondary',
                    keyboardClose: true,
                  }).then(toast => toast.present());
                },
                error: (error) => {
                  alert(`Erro ao excluir filme ${filmes.title} \n${error.error.message}`);
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
