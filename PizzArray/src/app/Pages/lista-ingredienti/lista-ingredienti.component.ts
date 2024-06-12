import { Component } from '@angular/core';
import { iIngredient } from '../../Models/i-ingredient';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-lista-ingredienti',
  templateUrl: './lista-ingredienti.component.html',
  styleUrl: './lista-ingredienti.component.scss'
})
export class ListaIngredientiComponent {

  ingredients:iIngredient[]=[]

  constructor(private recipeSvc:RecipeService){}

  ngOnInit(){
    this.recipeSvc.getIngredients().subscribe(ingredients=>{
      this.ingredients=ingredients
    })
  }
}
