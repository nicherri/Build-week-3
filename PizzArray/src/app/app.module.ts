import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { CreaRicettaModule } from './crea-ricetta/crea-ricetta.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HomeModule, CreaRicettaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
