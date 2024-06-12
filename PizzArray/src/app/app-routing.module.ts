import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream

const routes: Routes = [
  { path: 'Auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'Home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'crea-ricetta', loadChildren: () => import('./crea-ricetta/crea-ricetta.module').then(m => m.CreaRicettaModule) }];
=======
import { ListaRicetteComponent } from './Pages/lista-ricette/lista-ricette.component';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard]
  },

  { path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard]
  },

  { path: 'crea-ricetta',
    loadChildren: () => import('./crea-ricetta/crea-ricetta.module').then(m => m.CreaRicettaModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },

  { path: 'lista-ricette',
    component: ListaRicetteComponent
   },

  { path: 'register', component: RegisterComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
>>>>>>> Stashed changes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
