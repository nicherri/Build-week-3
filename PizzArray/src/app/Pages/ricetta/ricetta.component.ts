import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { iRecipe } from '../../Models/i-recipe';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.component.html',
  styleUrl: './ricetta.component.scss'
})
export class RicettaComponent {


  ricetta:iRecipe|undefined

  constructor(private recipeSvc:RecipeService, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.recipeSvc.getRecipeById(params.id).subscribe(recipe=>{
        this.ricetta=recipe
        console.log(this.ricetta)
      })


    })
  }
}
