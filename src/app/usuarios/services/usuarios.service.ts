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
            photo: '',
            email: 'joao@gmail.com',
            address: 'Rua Joaquim Nabuco',
            password: '123456',
            phone: '48996658439',
            admin: true
        }
    ]

    getById(usuariosId: number){
        return this.usuariosList.find(f => f.id === usuariosId);
    }

    getList(){
        return [...this.usuariosList];
    }
  
    private add(usuarios: Usuarios){
      this.usuariosList = [...this.usuariosList, {
        ...usuarios,
        id: this.getNextId()
      }];
    }
    
    private getNextId(): number {
        const maxId = this.usuariosList.reduce((id, usuarios) => {
            if (!!usuarios.id && usuarios?.id > id) {
                id = usuarios.id;
            }
            return id;
        }, 0);
    return maxId + 1;
    }
    
    save(usuarios: Usuarios){
      usuarios.id? this.update(usuarios) : this.add(usuarios);
    }
    
    private update(updatedUsuarios: Usuarios){
      this.usuariosList = this.usuariosList.map(u =>{ return (u.id === updatedUsuarios.id) ? updatedUsuarios : u });
    }
    
    remove(usuarios: Usuarios){
      this.usuariosList = this.usuariosList.filter(u => u.id !== usuarios.id);
    }    

}