import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaRicettaComponent } from './crea-ricetta.component';

const routes: Routes = [
  { path: '', component: CreaRicettaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreaRicettaRoutingModule { }
