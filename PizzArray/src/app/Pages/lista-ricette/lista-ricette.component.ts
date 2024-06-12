
import { Component } from '@angular/core';
import { iRecipe } from '../../Models/i-recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-ricette',
  templateUrl: './lista-ricette.component.html',
  styleUrl: './lista-ricette.component.scss'
})
export class ListaRicetteComponent {

  recipe: iRecipe[] = [];
  ingredient:string=""


  constructor(private recipeSvc:RecipeService, private route:ActivatedRoute, private navigate: Router){}


  ngOnInit(){
    this.route.params.subscribe((params:any)=>{this.getFilteredRecipes(params.ingrediente)})
  }


  getFilteredRecipes(ingrediente: string): void {
    this.recipeSvc.getRecipe(ingrediente).subscribe((data) => {
      this.recipe = data
      this.ingredient=ingrediente
      console.log("ricette filtrate",this.recipe)
    })
  }

  navigateToIngredient(ingredient: string): void {
    this.navigate.navigate(['/lista-ricette', ingredient]).then(() => {
      window.scrollTo(0, 0)
    })
  }



}
