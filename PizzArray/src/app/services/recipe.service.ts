import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { iRecipe } from '../Models/i-recipe';
import { iIngredient } from '../Models/i-ingredient';
import { iUser } from '../Models/i-user';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesUrl = 'http://localhost:3000/ricette';
  private ingredientsUrl = 'http://localhost:3000/ingredients';
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  addRecipe(recipe: iRecipe): Observable<iRecipe> {
    return this.http.post<iRecipe>(this.recipesUrl, recipe);
  }

  getRecipe(ingrediente: string): Observable<iRecipe[]> {
    return this.http.get<iRecipe[]>(this.recipesUrl).pipe(
      tap((data) => console.log("Dati ricevuti dall'API:", data)), // Per il debug
      map((recipes) =>
        recipes.filter((recipe) =>
          recipe.ingredienti.some((ing) =>
            ing.ingrediente.toLowerCase().includes(ingrediente.toLowerCase())
          )
        )
      )
    );
  }

  getAllRecipe(): Observable<iRecipe[]> {
    return this.http.get<iRecipe[]>(this.recipesUrl);
  }

  getIngredients() {
    return this.http.get<iIngredient[]>(this.ingredientsUrl);
  }

  getRecipeById(id: number): Observable<iRecipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<iRecipe>(url);
  }

  getUserById(userId: number): Observable<iUser> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<iUser>(url);
  }

  updateUser(user: iUser): Observable<iUser> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<iUser>(url, user);
  }
}
