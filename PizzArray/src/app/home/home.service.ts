import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { iRecipe } from '../Models/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class HomeService {


  constructor(private http: HttpClient) {}

  recipesUrl: string = 'http://localhost:3000/ricette';


  getAllIngredients(): Observable<string[]> {
    return this.http.get<iRecipe[]>(this.recipesUrl).pipe(
      map((recipes: iRecipe[]) => {
        const ingredientsSet: Set<string> = new Set();

        // Itera su tutte le ricette
        for (const recipe of recipes) {
          // Itera su tutti gli ingredienti di ogni ricetta
          for (const ingredient of recipe.ingredienti) {
            ingredientsSet.add(ingredient.ingrediente);
          }
        }

        // Converte il set in un array e lo restituisce
        return Array.from(ingredientsSet);
      })
    );
  }
}
