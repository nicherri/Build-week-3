export interface Root {
  ricette: Ricette2[]
  ingredients: Ingredients[]
}

export interface Ricette2 {
  id: number
  nome_ricetta: string
  immagine: string
  ingredienti: Ingredienti2[]
  tempo_preparazione: number
  tempo_cottura: number
  porzioni: number
  difficolta: string
  preparazione: string
  portata: string
}

export interface Ingredienti2 {
  ingrediente: string
  quantita: string
}

export interface Ingredients {
  ingrediente: string
  immagine: string
}
