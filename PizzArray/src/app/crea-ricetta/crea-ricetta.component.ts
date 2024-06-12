import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { iRecipe, Ingredienti } from '../Models/i-recipe';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-crea-ricetta',
  templateUrl: './crea-ricetta.component.html',
  styleUrls: ['./crea-ricetta.component.scss']
})
export class CreaRicettaComponent implements OnInit {
  recipeForm: FormGroup;
  existingIngredients: string[] = [];

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
    const recipe: iRecipe = this.recipeForm.value;
    this.addRecipe(recipe);
  }

  addRecipe(recipe: iRecipe) {
    this.recipeService.addRecipe(recipe).subscribe(
      response => {
        console.log('Recipe added successfully:', response);
      },
      error => {
        console.error('Error adding recipe:', error);
      }
    );
  }

  ngOnInit(): void {/*
    this.recipeService.getIngredients().subscribe(
      (ingredients: Ingredienti[]) => {
        this.existingIngredients = ingredients.map(ing => ing.ingrediente.toLowerCase());
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching ingredients:', error);
      }
    ); */
  }

  suggestions: { [index: number]: string[] } = {};

onIngredientInput(event: any, index: number) {
  const input = event.target.value;
  this.suggestions[index] = this.getFilteredIngredients(input);
}

selectSuggestion(suggestion: string, index: number) {
  const ingredientControl = this.ingredienti.at(index);
  ingredientControl.patchValue({ ingrediente: suggestion });
  this.suggestions[index] = []; // Clear suggestions
}

  getFilteredIngredients(name: string): string[] {
    return this.existingIngredients.filter(ingredient =>
      ingredient.includes(name.toLowerCase()));
  }
}
