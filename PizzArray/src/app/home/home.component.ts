import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ingredients: string[] = [];

  constructor(private recipeSvc: HomeService) {}

  ngOnInit(): void {
    this.recipeSvc.getAllIngredients().subscribe((data: string[]) => {
      this.ingredients = data;
    });
    console.log(this.ingredients);
  }
}
