export interface iRecipe {
  id: number;
  nome_ricetta: string;
  immagine: string;
  ingredienti: Ingredienti[];
  tempo_preparazione: number;
  tempo_cottura: number;
  porzioni: number;
  difficolta: string;
  preparazione: string;
  portata: string;
}

export interface Ingredienti {
  ingrediente: string;
  quantita: string;
}
