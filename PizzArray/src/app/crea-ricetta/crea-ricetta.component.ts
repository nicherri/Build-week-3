import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { iRecipe } from '../Models/i-recipe';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crea-ricetta',
  templateUrl: './crea-ricetta.component.html',
  styleUrls: ['./crea-ricetta.component.scss']
})
export class CreaRicettaComponent implements OnInit {
  recipeForm: FormGroup;
  existingIngredients: string[] = [];
  suggestions: { [index: number]: string[] } = {}

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef,
    private navigate: Router
  ) {
    this.recipeForm = this.fb.group({
      nome_ricetta: ['', Validators.required],
      immagine: ['', [Validators.required, Validators.pattern('https?://.+')]],
      ingredienti: this.fb.array([]),
      tempo_preparazione: ['', [Validators.required, Validators.min(1)]],
      tempo_cottura: ['', [Validators.required, Validators.min(1)]],
      porzioni: ['', [Validators.required, Validators.min(1)]],
      difficolta: ['', Validators.required],
      preparazione: ['', Validators.required],
      portata: ['', Validators.required]
    });
  }

  get ingredienti() {
    return this.recipeForm.get('ingredienti') as FormArray;
  }

  addIngredient(ingrediente: string = '', quantita: string = '') {
    this.ingredienti.push(this.fb.group({
      ingrediente: [ingrediente, Validators.required],
      quantita: [quantita, Validators.required]
    }));
  }

  removeIngredient(index: number) {
    this.ingredienti.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const recipe: iRecipe = { ...this.recipeForm.value };

    this.recipeService.addRecipe(recipe).subscribe(
      (addedRecipe: iRecipe) => {
        console.log('Recipe added successfully:', addedRecipe);
        this.navigate.navigate(['/home'])
      },
      error => {
        console.error('Error adding recipe:', error);
      }
    );


  }

  ngOnInit(): void {
    this.recipeService.getIngredients().subscribe(
      (ingredients: any[]) => {
        this.existingIngredients = ingredients.map(ing => ing.ingrediente.toLowerCase());
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  onIngredientInput(event: any, index: number) {
    const input = event.target.value;
    this.suggestions[index] = this.getFilteredIngredients(input);
  }

  selectSuggestion(suggestion: string, index: number) {
    const ingredientControl = this.ingredienti.at(index);
    ingredientControl.patchValue({ ingrediente: suggestion });
    this.suggestions[index] = [];
  }

  getFilteredIngredients(name: string): string[] {
    return this.existingIngredients.filter(ingredient =>
      ingredient.includes(name.toLowerCase())
    );
  }
}
