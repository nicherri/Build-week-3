import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { iRecipe } from '../../Models/i-recipe';
import { iListaSpesa } from '../../Models/i-lista-spesa';
import { iIngredient } from '../../Models/i-ingredient';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.component.html',
  styleUrls: ['./ricetta.component.scss'],
})
export class RicettaComponent implements OnInit {
  ricetta: iRecipe | undefined;
  userId: number | null = null;
  isFavorite: boolean = false;
  isUserLogged: boolean = false;
  arrayId: number[] = [];

  constructor(
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private recipeSvc: RecipeService
  ) {}

  ngOnInit() {
    this.authSvc.getUser().subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.getAllPreferiti(); // Carica i preferiti dell'utente
      } else {
        console.error('Utente non autenticato');
      }
    });

    this.route.params.subscribe((params: any) => {
      this.recipeSvc.getRecipeById(params.id).subscribe((recipe) => {
        this.ricetta = recipe;
        this.checkIfFavorite(); // Verifica se la ricetta è preferita dopo averla caricata
      });
    });

    this.checkUserLogged();
    this.checkIfFavorite();
  }

  addIngredient(ingrediente: string, quantita: string) {
    if (this.userId) {
      this.authSvc
        .addIngredientToUser(this.userId, ingrediente, quantita)
        .subscribe();
    }
  }

  toggleFavorite() {
    if (this.userId && this.ricetta?.id) {
      this.authSvc
        .toggleFavoriteRecipe(this.userId, this.ricetta.id)
        .subscribe((response) => {
          console.log('Toggle preferiti completato:', response);
          this.isFavorite = !this.isFavorite;
        });
    } else {
      console.error('Utente o ricetta non disponibili');
    }
  }

  checkUserLogged(): void {
    console.log(this.isUserLogged);
    this.authSvc.isLoggedIn$.subscribe((isUserLogged) => {
      this.isUserLogged = isUserLogged;
      console.log(this.isUserLogged);
    });
  }

  checkIfFavorite() {
    if (this.ricetta) {
      this.isFavorite = this.arrayId.includes(this.ricetta.id!);
      console.log('array', this.arrayId);
      console.log('id ricetta', this.ricetta.id);
    }
  }

  getAllPreferiti() {
    this.authSvc.getUserPreferiti().subscribe((id) => {
      this.arrayId = id;
      console.log(this.arrayId);
      this.checkIfFavorite(); // Verifica se la ricetta è preferita dopo aver caricato i preferiti
    });
  }
}
