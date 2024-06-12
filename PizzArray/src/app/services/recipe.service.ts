import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { iRecipe } from '../Models/i-recipe';
import { iIngredient } from '../Models/i-ingredient';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'http://localhost:3000/ricette';
  private ingredientsUrl="http://localhost:3000/ingredients"

  constructor(private http: HttpClient) {}

  addRecipe(recipe: iRecipe): Observable<iRecipe> {
    return this.http.post<iRecipe>(this.recipesUrl, recipe);
  }

  /*
  getRecipe(ingrediente: string): Observable<iRecipe[]> {
    return this.http.get<iRecipe[]>(this.recipesUrl).pipe(
      map(recipes => recipes.filter(recipe =>
        recipe.ingredienti.some(ing => ing.ingrediente.toLowerCase().includes(ingrediente.toLowerCase()))
      ))
    )
  }*/


    getRecipe(ingrediente: string): Observable<iRecipe[]> {
      return this.http.get<iRecipe[]>(this.recipesUrl).pipe(
        tap(data => console.log('Dati ricevuti dall\'API:', data)), // Per il debug
        map(recipes => recipes.filter(recipe =>
          recipe.ingredienti.some(ing => ing.ingrediente.toLowerCase().includes(ingrediente.toLowerCase()))
        ))
      )
    }





    getIngredients(){
      return this.http.get<iIngredient[]>(this.ingredientsUrl)
    }

    getRecipeById(id: number): Observable<iRecipe> {
      const url = `${this.recipesUrl}/${id}`
      return this.http.get<iRecipe>(url)
    }
}
