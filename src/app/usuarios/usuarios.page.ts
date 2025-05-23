import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { Usuarios } from './models/usuarios.type';
import { AuthService } from '../login/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage implements OnInit, ViewWillEnter {
  usuariosAtual: Usuarios | undefined;
  usuariosList: Usuarios[] = [];
  
  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { 
  }
  async ionViewWillEnter(): Promise<void> {
    await this.carregarDadosUsuario();
  }

  async ngOnInit() {}

  async carregarDadosUsuario(){
    const usuarioId = await this.authService.getUsuarioId();
    if(usuarioId){
      this.usuariosAtual = await this.usuariosService.getById(usuarioId);
      if(this.usuariosAtual?.admin){
        this.usuariosList = this.usuariosService.getList();
      }
    }
  }

  remove(usuarios: Usuarios) {
      this.alertController.create({
        header: 'Excluir Usuário',
        message: `Deseja excluir o Usuário ${usuarios.name}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.usuariosService.remove(usuarios);
              this.usuariosList = this.usuariosService.getList();
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
