import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Ingredienti } from '../Models/i-recipe';
import { Ingredients } from '../Models/i-ingredients';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crea-ricetta',
  templateUrl: './crea-ricetta.component.html',
  styleUrls: ['./crea-ricetta.component.scss']
})
export class CreaRicettaComponent implements OnInit {
  recipeForm: FormGroup;
  ingredients: Ingredients[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private cdr: ChangeDetectorRef) {
    this.recipeForm = this.fb.group({
      nome_ricetta: [''],
      immagine: [''],
      ingredienti: this.fb.array([]),
      tempo_preparazione: [''],
      tempo_cottura: [''],
      porzioni: [''],
      difficolta: [''],
      preparazione: [''],
      portata: ['']
    });
  }

  get ingredienti() {
    return this.recipeForm.get('ingredienti') as FormArray;
  }

  addIngredient(ingrediente: string = '', quantita: string = '') {
    this.ingredienti.push(this.fb.group({
      ingrediente: [ingrediente],
      quantita: [quantita]
    }));
  }

  removeIngredient(index: number) {
    this.ingredienti.removeAt(index);
  }

  onSubmit() {
    this.recipeService.addRecipe(this.recipeForm.value).subscribe(
      response => {
        console.log('Recipe added successfully:', response);
      },
      error => {
        console.error('Error adding recipe:', error);
      }
    );
  }

  ngOnInit(): void {
    this.recipeService.getIngredients().subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }
}
