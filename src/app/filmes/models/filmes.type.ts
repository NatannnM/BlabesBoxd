import { Diretor } from "../../diretor/models/diretor.type";
import { Estudios } from "../../estudios/models/estudios.type";
import { Generos } from "./generos.type";

export type Filmes = {
  id?: number,
  title: string,
  image: string | null,
  launchDate: Date | string,
  genre: Generos[],
  director: Diretor[],
  estudios: Estudios[],
}