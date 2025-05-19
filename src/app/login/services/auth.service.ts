import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuarios } from 'src/app/usuarios/models/usuarios.type';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageReady: Promise<void>;

  usuariosList: Usuarios[] = [];
  

  constructor(private storage: Storage, private usuariosService: UsuariosService) {
    this.storageReady = this.initStorage();
  }

  private async initStorage(): Promise<void> {
    await this.storage.create();
  }


  async login(email: string, password: string): Promise<number | null> {
    this.usuariosList = this.usuariosService.getList();
    const usuarios = this.usuariosList.find(u => u.email === email && u.password === password);
    if (usuarios ) {
      await this.storageReady;
      await this.storage.set('usuario_id', usuarios.id);
      return usuarios.id!;
    }
    return null;
  }

  async getUsuarioId(): Promise<number | null> {
    await this.storageReady;
    return this.storage.get('usuario_id');
  }

  async logout(): Promise<void> {
    await this.storageReady;
    await this.storage.remove('usuario_id');
  }
}
