import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'Home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'crea-ricetta', loadChildren: () => import('./crea-ricetta/crea-ricetta.module').then(m => m.CreaRicettaModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
