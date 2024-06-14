import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { iUser } from '../Models/i-user';
import { iResponse } from '../Models/i-response';
import { iAuthData } from '../Models/i-auth-data';
import { iUserData } from '../Models/i-user-data';
import { Ingredienti } from '../Models/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersDataURL = 'http://localhost:3000/userData';

  constructor(private http: HttpClient, private router: Router) {
    this.loggedUser();
  }

  loginURL: string = 'http://localhost:3000/login';
  registerURL: string = 'http://localhost:3000/register';

  jwtHelper: JwtHelperService = new JwtHelperService();

  authSbj = new BehaviorSubject<null | iUser>(null);

  syncIsLoggedIn: boolean = false;

  user$ = this.authSbj.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map((user) => !!user),
    tap((user) => (this.syncIsLoggedIn = !!user)),
    tap((user) => console.log('service', user))
  );

  register(newUser: Partial<iUser>): Observable<iResponse> {
    return this.http.post<iResponse>(this.registerURL, newUser).pipe(
      tap((response) => {
        this.saveUserData(response.user);
      })
    );
  }

  saveUserData(user: iUser) {
    const userData: iUserData = {
      id: user.id,
      ricette_preferite: [],
      lista_ingredienti: [],
      userId: user.id,
    };

    this.http.post(this.usersDataURL, userData).subscribe(
      () => console.log('Dati utente salvati con successo'),
      (error) => console.error('Errore nel salvataggio dei dati utente:', error)
    );
  }

  login(authData: iAuthData): Observable<iResponse> {
    return this.http.post<iResponse>(this.loginURL, authData).pipe(
      tap((dati) => {
        this.authSbj.next(dati.user);
        localStorage.setItem('accessData', JSON.stringify(dati));
      })
    );
  }

  getLoggedUser(): iResponse | null {
    const getAccessData = localStorage.getItem('accessData');
    if (!getAccessData) return null;
    return JSON.parse(getAccessData);
  }

  loggedUser() {
    const accessData = this.getLoggedUser();
    if (!accessData) return;
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;
    this.authSbj.next(accessData.user);
    this.autoLogOut();
  }

  autoLogOut(): void {
    const accessData = this.getLoggedUser();
    if (!accessData) return;

    const expired = this.jwtHelper.getTokenExpirationDate(
      accessData.accessToken
    ) as Date;
    const expiredMilliseconds = expired.getTime() - new Date().getTime();
    setTimeout(this.logout, expiredMilliseconds);
  }

  logout(): void {
    this.authSbj.next(null);
    localStorage.removeItem('accessData');
    this.syncIsLoggedIn = false;
    this.router.navigate(['/']);
  }

  getUser(): Observable<iUser | null> {
    return this.authSbj.asObservable();
  }

  // Implementazione di getUserData
  getUserData(userId: number): Observable<iUserData> {
    return this.http.get<iUserData[]>(this.usersDataURL).pipe(
      map((usersData: iUserData[]) => {
        const userData = usersData.find((user) => user.userId === userId);
        if (!userData) {
          throw new Error(`User with ID ${userId} not found`);
        }
        return userData;
      })
    );
  }

  // Funzione per aggiungere ingredienti all'utente loggato
  addIngredientToUser(
    userId: number,
    ingrediente: string,
    quantita: string
  ): Observable<any> {
    return this.http.get<iUserData[]>(this.usersDataURL).pipe(
      map((users: iUserData[]) => {
        const userData = users.find((user) => user.userId === userId);
        if (!userData) {
          throw new Error(`User with ID ${userId} not found`);
        }

        userData.lista_ingredienti.push({ ingrediente, quantita });

        return userData;
      }),
      switchMap((updatedUserData) =>
        this.http.put(
          `${this.usersDataURL}/${updatedUserData.id}`,
          updatedUserData
        )
      )
    );
  }

  // Funzione di toggle per aggiungere/rimuovere l'ID della ricetta ai preferiti
  toggleFavoriteRecipe(userId: number, recipeId: number): Observable<any> {
    return this.getUserData(userId).pipe(
      map((userData) => {
        const index = userData.ricette_preferite.indexOf(recipeId);
        if (index === -1) {
          userData.ricette_preferite.push(recipeId);
        } else {
          userData.ricette_preferite.splice(index, 1);
        }
        return userData;
      }),
      switchMap((updatedUserData) =>
        this.http.put(
          `${this.usersDataURL}/${updatedUserData.id}`,
          updatedUserData
        )
      )
    );
  }

  getUserIngredients(): Observable<Ingredienti[]> {
    const accessData = this.getLoggedUser();
    if (!accessData || !accessData.user) {
      throw new Error('No user logged in');
    }
    const userId = accessData.user.id;

    return this.getUserData(userId).pipe(
      map((userData: iUserData) => userData.lista_ingredienti)
    );
  }

  getUserPreferiti(): Observable<number[]> {
    const accessData = this.getLoggedUser();
    if (!accessData || !accessData.user) {
      throw new Error('No user logged in');
    }
    const userId = accessData.user.id;

    return this.getUserData(userId).pipe(
      map((userData: iUserData) => userData.ricette_preferite)
    );
  }
}
