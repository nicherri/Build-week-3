import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iUser } from '../Models/i-user';
import { iResponse } from '../Models/i-response';
import { iAuthData } from '../Models/i-auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,

  ) {}

  loginURL: string = 'http://localhost:3000/login';
  registerURL: string = 'http://localhost:3000/register';

  jwtHelper: JwtHelperService = new JwtHelperService();

  authSbj = new BehaviorSubject<null | iUser>(null);

  syncIsLoggedIn: boolean = false;



  //LOGIN
  user$ = this.authSbj.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map((user) => !user),
    tap((user) => (this.syncIsLoggedIn = user))
  );

  //REGISTRAZIONE
  register(newUser: Partial<iUser>): Observable<iResponse> {
    return this.http.post<iResponse>(this.registerURL, newUser);
  }

  // LOGIN UTENTE
  login(authData: iAuthData): Observable<iResponse> {
    return this.http.post<iResponse>(this.loginURL, authData).pipe(
      tap((dati) => {
        this.authSbj.next(dati.user),
          localStorage.setItem('accessData', JSON.stringify(dati));
        this.syncIsLoggedIn = true;
      })
    );
  }

  // OTTENERE I DATI DELL'UTENTE LOGGATO
  getLoggedUser(): iResponse | null {
    const getAccessData = localStorage.getItem('accessData');

    if (!getAccessData) return null; // Non esiste
    const accessData = JSON.parse(getAccessData);
    return accessData; // Esiste
  }

  //RECUPERA DATI PER RIMANERE LOGGATO
  loggedUser() {
    const accessData = this.getLoggedUser();
    if (!accessData) return; // Utente non loggato
    if (this.jwtHelper.isTokenExpired(accessData.token)) return; // Token scaduto
    this.authSbj.next(accessData.user); // Utente loggato
    // Avvio timer per auto logout
    this.autoLogOut();
  }



  // LOGOUT AUTOMATICO ALLO SCADERE DEL TOKEN
  autoLogOut(): void {
    const accessData = this.getLoggedUser();
    if (!accessData) return; // Utente non loggato

    //Quando scade il token
    const expired = this.jwtHelper.getTokenExpirationDate(
      accessData.token
    ) as Date;

    const expiredMilliseconds = expired.getTime() - new Date().getTime();

    setTimeout(this.logout, expiredMilliseconds);
  }

//  LOGOUT
logout(): void {
  this.authSbj.next(null);
  localStorage.removeItem('accessData');
  this.syncIsLoggedIn = false;
  this.router.navigate(['/']);
}
}
