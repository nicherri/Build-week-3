import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRicetteComponent } from './Pages/lista-ricette/lista-ricette.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'crea-ricetta', loadChildren: () => import('./crea-ricetta/crea-ricetta.module').then(m => m.CreaRicettaModule) },
  { path: 'lista-ricette',
    component: ListaRicetteComponent
   },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
