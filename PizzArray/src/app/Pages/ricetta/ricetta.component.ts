import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { iRecipe } from '../../Models/i-recipe';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.component.html',
  styleUrls: ['./ricetta.component.scss'],
})
export class RicettaComponent implements OnInit {
  ricetta: iRecipe | undefined;
  userId: number | null = null;
  isFavorite: boolean = false;

  constructor(
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private recipeSvc: RecipeService
  ) {}

  ngOnInit() {
    this.authSvc.getUser().subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.checkIfFavorite();
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

  checkIfFavorite() {
    if (this.userId && this.ricetta) {
      this.authSvc.getUser().subscribe((user) => {
        if (user) {
          this.authSvc.getUserData(user.id).subscribe((userData) => {
            this.isFavorite = userData.ricette_preferite.includes(
              this.ricetta!.id!
            );
          });
        }
      });
    }
  }

  addIngredient(ingrediente: string, quantita: string) {
    if (this.userId) {
      this.authSvc
        .addIngredientToUser(this.userId, ingrediente, quantita)
        .subscribe(
          (response) => {
            console.log('Ingrediente aggiunto con successo:', response);
          },
          (error) => {
            console.error("Errore nell'aggiunta dell'ingrediente:", error);
          }
        );
    } else {
      console.error('Utente non autenticato o ID utente non disponibile');
    }
  }

  toggleFavorite() {
    if (this.userId && this.ricetta?.id) {
      this.authSvc.toggleFavoriteRecipe(this.userId, this.ricetta.id).subscribe(
        (response) => {
          console.log('Toggle preferiti completato:', response);
          this.isFavorite = !this.isFavorite;
        },
        (error) => {
          console.error('Errore nel toggle dei preferiti:', error);
        }
      );
    } else {
      console.error('Utente o ricetta non disponibili');
    }
  }
}
