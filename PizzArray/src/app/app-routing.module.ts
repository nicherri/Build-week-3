import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRicetteComponent } from './Pages/lista-ricette/lista-ricette.component';
import { ListaIngredientiComponent } from './Pages/lista-ingredienti/lista-ingredienti.component';
import { RicettaComponent } from './Pages/ricetta/ricetta.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'crea-ricetta', loadChildren: () => import('./crea-ricetta/crea-ricetta.module').then(m => m.CreaRicettaModule) },
  { path: 'lista-ricette',
    component: ListaRicetteComponent
   },
  { path: 'lista-ingredienti',
    component: ListaIngredientiComponent
   },
   {path:"ricetta/:id",
    component:RicettaComponent
   },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
