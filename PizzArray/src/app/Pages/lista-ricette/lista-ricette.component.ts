
import { Component } from '@angular/core';
import { iRecipe } from '../../Models/i-recipe';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-lista-ricette',
  templateUrl: './lista-ricette.component.html',
  styleUrl: './lista-ricette.component.scss'
})
export class ListaRicetteComponent {

  recipe: iRecipe[] = [];
  ingrediente: string = 'pomodoro';  // esempio di ingrediente da cercare

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getFilteredRecipes(this.ingrediente);
  }

  getFilteredRecipes(ingrediente: string): void {
    this.recipeService.getRecipe(ingrediente).subscribe((data) => {
      this.recipe = data
      console.log("ricette filtrate",this.recipe)
    })
  }


}
