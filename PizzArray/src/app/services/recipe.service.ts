import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iRecipe } from '../Models/i-recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'http://localhost:3000/ricette';

  constructor(private http: HttpClient) {}

  addRecipe(recipe: iRecipe): Observable<iRecipe> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.post<iRecipe>(this.recipesUrl, recipe, { headers });
  }
}
