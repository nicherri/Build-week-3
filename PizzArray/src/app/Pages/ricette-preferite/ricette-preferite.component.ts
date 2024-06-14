import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { iRecipe } from '../../Models/i-recipe';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-ricette-preferite',
  templateUrl: './ricette-preferite.component.html',
  styleUrls: ['./ricette-preferite.component.scss'], // Correggi 'styleUrl' in 'styleUrls'
})
export class RicettePreferiteComponent implements OnInit {
  allRecipe: iRecipe[] = [];
  arrayId: number[] = [];
  favoriteRecipes: iRecipe[] = []; // Array per memorizzare le ricette filtrate

  constructor(
    private navigate: Router,
    private recipeSvc: RecipeService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.getAllRecipe();
    this.getAllPreferiti();
  }

  navigateToIngredient(ingredient: string): void {
    this.navigate.navigate(['/lista-ricette', ingredient]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  getAllRecipe() {
    this.recipeSvc.getAllRecipe().subscribe((recipe) => {
      this.allRecipe = recipe;
      console.log(this.allRecipe);
      this.updateFavoriteRecipes(); // Aggiorna le ricette preferite dopo il caricamento
    });
  }

  getAllPreferiti() {
    this.authSvc.getUserPreferiti().subscribe((id) => {
      this.arrayId = id;
      console.log(this.arrayId);
      this.updateFavoriteRecipes(); // Aggiorna le ricette preferite dopo il caricamento
    });
  }

  // Funzione per aggiornare le ricette preferite
  updateFavoriteRecipes() {
    if (this.allRecipe.length > 0 && this.arrayId.length > 0) {
      this.favoriteRecipes = this.getFavoriteRecipes();
      console.log('preferite', this.favoriteRecipes);
    }
  }

  // Funzione per filtrare le ricette preferite
  getFavoriteRecipes(): iRecipe[] {
    return this.allRecipe.filter((recipe) => this.arrayId.includes(recipe.id!));
  }
}
