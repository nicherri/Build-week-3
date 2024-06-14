import { Ingredienti } from './i-recipe';

export interface iUserData {
  id: number;
  ricette_preferite: number[];
  lista_ingredienti: Ingredienti[];
  userId: number;
}
