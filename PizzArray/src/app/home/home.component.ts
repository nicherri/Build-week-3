import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iRecipe } from '../Models/i-recipe';
import { iIngredient } from '../Models/i-ingredient';
import { RecipeService } from '../services/recipe.service'; // Correggi il percorso secondo la tua struttura di directory
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ingredients: iIngredient[] = [];
  randomIngredients: iIngredient[] = [];
  recipes: iRecipe[] = [];
  randomRecipes: iRecipe[] = [];
  cerca: string = ""

  private recipesUrl = 'http://localhost:3000/ricette'; // Assicurati che questo URL sia corretto

  constructor(private recipeSvc: RecipeService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Ottieni gli ingredienti
    this.recipeSvc.getIngredients().subscribe((data: iIngredient[]) => {
      this.ingredients = data;
      this.randomIngredients = this.getRandomIngredients(4);
    });

    // Ottieni le ricette
    this.getAllRecipes().subscribe((data: iRecipe[]) => {
      this.recipes = data;
      this.randomRecipes = this.getRandomRecipes(3);
    });
  }

  getAllRecipes() {
    return this.http.get<iRecipe[]>(this.recipesUrl);
  }

  getRandomIngredients(num: number): iIngredient[] {
    const shuffled = [...this.ingredients].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  getRandomRecipes(num: number): iRecipe[] {
    const shuffled = [...this.recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  openRandomRecipe(): void {
    if (this.recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.recipes.length);
      const randomRecipe = this.recipes[randomIndex];
      this.router.navigate(['/ricetta', randomRecipe.id]);
    }
  }
}
