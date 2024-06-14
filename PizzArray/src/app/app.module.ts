import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { CreaRicettaModule } from './crea-ricetta/crea-ricetta.module';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListaRicetteComponent } from './Pages/lista-ricette/lista-ricette.component';
import { ListaIngredientiComponent } from './Pages/lista-ingredienti/lista-ingredienti.component';
import { RicettaComponent } from './Pages/ricetta/ricetta.component';
import { ProfiloComponent } from './Pages/profilo/profilo.component';
import { RicettePreferiteComponent } from './Pages/ricette-preferite/ricette-preferite.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ListaRicetteComponent,
    ListaIngredientiComponent,
    RicettaComponent,
    ProfiloComponent,
    RicettePreferiteComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomeModule,
    CreaRicettaModule,
    FormsModule,
    CommonModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
