import { Filmes } from "src/app/filmes/models/filmes.type"

export type Diretor = {
  id?: string,
  nome: string,
  image: string | null,
  sobre: string,
  birthDate: Date | string,
  filmes: Filmes[]
}
