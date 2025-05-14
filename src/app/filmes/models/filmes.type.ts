export type Filmes = {
  id?: number,
  image: string | null,
  title: string,
  launchDate: Date | string,
  genero: string,
  diretor: string,
  //estudio: Estudio[]
}