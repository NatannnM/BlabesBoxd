export type Filmes = {
  id?: number,
  title: string,
  image: string | null,
  launchDate: Date | string,
  genre: string[],
  //director: string,
  //estudio: Estudio[]
}