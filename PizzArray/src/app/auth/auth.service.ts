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

  ) {this.loggedUser()}

  loginURL: string = 'http://localhost:3000/login';
  registerURL: string = 'http://localhost:3000/register';

  jwtHelper: JwtHelperService = new JwtHelperService();

  authSbj = new BehaviorSubject<null | iUser>(null);

  syncIsLoggedIn: boolean = false;

  // Observables for user and login state
  user$ = this.authSbj.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map((user) => !!user),  // Map to true if user is not null
    tap((isLoggedIn) => (this.syncIsLoggedIn = isLoggedIn))  // Sync the login state
  );

  // Registration
  register(newUser: Partial<iUser>): Observable<iResponse> {
    return this.http.post<iResponse>(this.registerURL, newUser);
  }

  // Login
  login(authData: iAuthData): Observable<iResponse> {
    return this.http.post<iResponse>(this.loginURL, authData).pipe(
      tap((dati) => {
        this.authSbj.next(dati.user);
        localStorage.setItem('accessData', JSON.stringify(dati));
        this.syncIsLoggedIn = true;
        this.autoLogOut();
      })
    );
  }

  // Get logged user data
  getLoggedUser(): iResponse | null {
    const getAccessData = localStorage.getItem('accessData');
    if (!getAccessData) return null;
    return JSON.parse(getAccessData);
  }

  // Check if user is logged in and set user state
  loggedUser() {
    const accessData = this.getLoggedUser();
    if (!accessData) return;

    const token = accessData.token;
    if (this.jwtHelper.isTokenExpired(token)) return;

    this.authSbj.next(accessData.user);
    this.autoLogOut();
  }

  // Set auto logout timer
  autoLogOut(): void {
    const accessData = this.getLoggedUser();
    if (!accessData) return;

    const token = accessData.token;
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    if (!expirationDate) return;

    const expirationMilliseconds = expirationDate.getTime() - new Date().getTime();
    setTimeout(() => this.logout(), expirationMilliseconds);
  }

//  LOGOUT
logout(): void {
  this.authSbj.next(null);
  localStorage.removeItem('accessData');
  this.syncIsLoggedIn = false;
  this.router.navigate(['/']);
}

getUser(): Observable<iUser | null> {
  return this.authSbj.asObservable();
}

}
