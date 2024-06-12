import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

  getRecipe(ingrediente: string): Observable<iRecipe[]> {
    return this.http.get<iRecipe[]>(this.recipesUrl).pipe(
      map(recipes => recipes.filter(recipe =>
        recipe.ingredienti.some(ing => ing.ingrediente.toLowerCase().includes(ingrediente.toLowerCase()))
      ))
    );
  }

  getIngredients(): Observable<iIngredient[]> {
    return this.http.get<iIngredient[]>(this.ingredientsUrl);
  }

}
