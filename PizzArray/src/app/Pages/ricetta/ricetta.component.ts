import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { iRecipe } from '../../Models/i-recipe';
import { iListaSpesa } from '../../Models/i-lista-spesa';
import { iIngredient } from '../../Models/i-ingredient';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.component.html',
  styleUrl: './ricetta.component.scss'
})
export class RicettaComponent {


  ricetta:iRecipe|undefined

  constructor(private recipeSvc:RecipeService, private route:ActivatedRoute){

  }

  /*ListaSpesaArr:iListaSpesa[] = [];


  addToListaSpesa(ingrediente:string, quantita:string) {
    this.ListaSpesaArr.push(ingrediente, quantita)
  }*/

  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.recipeSvc.getRecipeById(params.id).subscribe(recipe=>{
        this.ricetta=recipe
        console.log(this.ricetta)
      })


    })
  }
}
