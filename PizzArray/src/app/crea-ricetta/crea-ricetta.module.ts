import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreaRicettaRoutingModule } from './crea-ricetta-routing.module';
import { CreaRicettaComponent } from './crea-ricetta.component';


@NgModule({
  declarations: [
    CreaRicettaComponent
  ],
  imports: [
    CommonModule,
    CreaRicettaRoutingModule
  ]
})
export class CreaRicettaModule { }
