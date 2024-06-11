import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-crea-ricetta',
  templateUrl: './crea-ricetta.component.html',
  styleUrl: './crea-ricetta.component.scss'
})
export class CreaRicettaComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
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

  addIngredient() {
    this.ingredienti.push(this.fb.group({
      ingrediente: [''],
      quantita: ['']
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
  }
}
