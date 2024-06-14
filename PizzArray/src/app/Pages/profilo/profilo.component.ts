import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../../auth/auth.service';
import { Ingredienti } from '../../Models/i-recipe';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent {
  ingredients: Ingredienti[] = [];
  user: iUser | undefined;

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      this.user = user || undefined;
    });

    this.authSvc.getUserIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
      console.log('Ingredients:', this.ingredients);
    });
  }
}
