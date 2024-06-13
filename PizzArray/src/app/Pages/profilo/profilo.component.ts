import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../../auth/auth.service';
import { Ingredienti } from '../../Models/i-recipe';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  listaArray:Ingredienti[] = []
  user:iUser|undefined;

  constructor (private authSvc:AuthService){}

  ngOnInit() {

    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })

    this.getLista()
  }

  getLista(){
    this.authSvc.getUser().subscribe(user => {
       if(user?.lista)this.listaArray=user?.lista
      console.log('Lista',this.listaArray)})
  }

}


