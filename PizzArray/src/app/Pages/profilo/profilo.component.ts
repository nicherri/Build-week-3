import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  user:iUser|undefined;

  constructor (private authSvc:AuthService){}

  ngOnInit() {

    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }
}
