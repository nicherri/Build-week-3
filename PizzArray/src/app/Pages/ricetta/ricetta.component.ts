import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Ingredienti, iRecipe } from '../../Models/i-recipe';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.component.html',
  styleUrl: './ricetta.component.scss',
})
export class RicettaComponent {
  ricetta: iRecipe | undefined;
  userId: number | null = null;

  constructor(
    private recipeSvc: RecipeService,
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.authSvc.getUser().subscribe((user: iUser | null) => {
      if (user) {
        this.userId = user.id;
        console.log('User ID:', this.userId);
      } else {
        console.error('Utente non autenticato');
      }
    });

    this.route.params.subscribe((params: any) => {
      this.recipeSvc.getRecipeById(params.id).subscribe((recipe) => {
        this.ricetta = recipe;
        console.log(this.ricetta);
      });
    });
  }

  aggiungiAllaLista(ingrediente: Ingredienti): void {
    if (this.userId !== null) {
      this.recipeSvc.getUserById(this.userId).subscribe((user) => {
        if (!user.lista) {
          user.lista = [];
        }
        user.lista.push(ingrediente);
        this.recipeSvc.updateUser(user).subscribe(
          (updatedUser) => {
            console.log('Lista aggiornata:', updatedUser.lista);
          },
          (error) => {
            console.error("Errore durante l'aggiornamento della lista:", error);
          }
        );
      });
    } else {
      console.error('User ID non disponibile');
    }
  }
}
