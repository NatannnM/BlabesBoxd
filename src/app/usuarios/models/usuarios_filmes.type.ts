import { Filmes } from "src/app/filmes/models/filmes.type";
import { Usuarios } from "./usuarios.type";

export type Usuarios_Filmes = {
    id?: string;
    usuariosId: string;
    filmesId: string;
    nota: number;
    review: string;
}