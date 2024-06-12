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
    this.recipeSvc.getIngredients().subscribe({
      next: (ingr) => {
        console.log('Ingredients fetched:', ingr);
        this.ingredients = ingr.sort((a, b) => a.ingrediente.localeCompare(b.ingrediente));
        this.totalItems = this.ingredients.length;
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching ingredients:', error);
      }
    });
  }

  updatePagination(): void {
    console.log('Updating pagination with page:', this.page, 'items per page:', this.itemsPerPage);
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

  onItemsPerPageChange(): void {
    this.page = 1;  // Reset to first page whenever items per page change
    this.updatePagination();
  }

  formatInput(target: EventTarget | null): void {
    const input = target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9]/g, '');
    input.value = value;
  }
}
