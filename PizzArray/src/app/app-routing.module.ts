import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRicetteComponent } from './Pages/lista-ricette/lista-ricette.component';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { ListaIngredientiComponent } from './Pages/lista-ingredienti/lista-ingredienti.component';
import { RicettaComponent } from './Pages/ricetta/ricetta.component';
import { ProfiloComponent } from './Pages/profilo/profilo.component';
import { RicettePreferiteComponent } from './Pages/ricette-preferite/ricette-preferite.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'crea-ricetta',
    loadChildren: () =>
      import('./crea-ricetta/crea-ricetta.module').then(
        (m) => m.CreaRicettaModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },

  { path: 'lista-ricette/:ingrediente', component: ListaRicetteComponent },

  { path: 'lista-ingredienti', component: ListaIngredientiComponent },
  { path: 'ricetta/:id', component: RicettaComponent },
  {
    path: 'profilo',
    component: ProfiloComponent,

    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'preferite',
    component: RicettePreferiteComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
