import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreaRicettaRoutingModule } from './crea-ricetta-routing.module';
import { CreaRicettaComponent } from './crea-ricetta.component';


@NgModule({
  declarations: [
    CreaRicettaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CreaRicettaRoutingModule
  ]
})
export class CreaRicettaModule { }
