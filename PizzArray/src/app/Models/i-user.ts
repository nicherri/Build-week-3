import { iIngredient } from "./i-ingredient";
import { Ingredienti } from "./i-recipe";

export interface iUser {

  id:number;
  nome:string;
  email:string;
  password:string;
  lista?:Ingredienti[]
}
