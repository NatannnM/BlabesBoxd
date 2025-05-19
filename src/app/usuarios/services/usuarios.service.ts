import { Injectable } from "@angular/core";
import { Usuarios } from "../models/usuarios.type";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService{

    private usuariosList: Usuarios[] = [
        {
            id: 1,
            name: 'João',
            nickname: 'Jão',
            email: 'joao@gmail.com',
            address: 'Rua Joaquim Nabuco',
            password: '123456',
            phone: 48996658439,
            admin: true
        }
    ]

    getById(usuariosId: number){
        return this.usuariosList.find(f => f.id === usuariosId);
    }

    getList(){
        return [...this.usuariosList];
    }
}