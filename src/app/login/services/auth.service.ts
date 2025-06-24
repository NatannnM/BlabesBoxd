import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { Usuarios } from 'src/app/usuarios/models/usuarios.type';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageReady: Promise<void>;
  private readonly API_URL = 'http://localhost:3000';

  usuariosList: Usuarios[] = [];
  

  constructor(
    private storage: Storage, 
    private http: HttpClient,
    private usuariosService: UsuariosService,
  ) {
    this.storageReady = this.initStorage();
  }

  private async initStorage(): Promise<void> {
    await this.storage.create();
  }


  async login(email: string, password: string): Promise<any> {
    try{
      const response: any = await firstValueFrom(this.http.post(`${this.API_URL}/auth/login`, {email, password}));
      const user = response.user;

      await this.storageReady;
      await this.storage.set('usuario', user);
      return user;
    } catch(err){
      console.error('Erro ao Logar:', err);
      return null
    }
  }

  async getUsuario(): Promise<any | null> {
    await this.storageReady;
    return this.storage.get('usuario');
  }

  async getUsuarioId(): Promise<string | null> {
    const usuario = await this.getUsuario();
    return usuario?.id || null;
  }

  async logout(): Promise<void> {
    await this.storageReady;
    await this.storage.remove('usuario');
  }
}
