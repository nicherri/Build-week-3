import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRicetteComponent } from './Pages/lista-ricette/lista-ricette.component';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { ListaIngredientiComponent } from './Pages/lista-ingredienti/lista-ingredienti.component';
import { RicettaComponent } from './Pages/ricetta/ricetta.component';

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

  { path: 'lista-ricette/:ingrediente',
    component: ListaRicetteComponent
   },

   { path: 'lista-ingredienti',
    component: ListaIngredientiComponent
   },
   {path:"ricetta/:id",
    component:RicettaComponent
   },

  { path: 'register', component: RegisterComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
  ]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
