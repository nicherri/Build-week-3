import { Component, OnInit } from '@angular/core';
import { iIngredient } from '../../Models/i-ingredient';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-lista-ingredienti',
  templateUrl: './lista-ingredienti.component.html',
  styleUrls: ['./lista-ingredienti.component.scss']
})
export class ListaIngredientiComponent implements OnInit {
  ingredients: iIngredient[] = [];
  displayedIngredients: iIngredient[] = [];
  itemsPerPage: number = 10;
  page: number = 1;
  totalItems: number = 0;

  constructor(private recipeSvc: RecipeService) {}

  ngOnInit(): void {
    this.recipeSvc.getIngredients().subscribe(
      ingr => {
        console.log('Ingredients fetched:', ingr);
        this.ingredients = ingr;
        this.totalItems = this.ingredients.length;
        this.updatePagination();
      },
      error => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  updatePagination(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedIngredients = this.ingredients.slice(startIndex, endIndex);
    console.log('Displayed Ingredients:', this.displayedIngredients);
  }

  selectPage(page: any): void {
    const pageNumber = Number(page);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.page = pageNumber;
      this.updatePagination();
      console.log('Page selected:', this.page);
    }
  }

  formatInput(target: EventTarget | null): void {
    const input = target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9]/g, '');
    input.value = value;
  }
}
