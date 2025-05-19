import { Diretor } from "../../diretor/models/diretor.type";
import { Estudios } from "../../estudios/models/estudios.type";

export type Filmes = {
  id?: number,
  title: string,
  image: string | null,
  launchDate: Date | string,
  genre: string[],
  director: Diretor,
  estudios: Estudios,
  //estudio: Estudio[]
}