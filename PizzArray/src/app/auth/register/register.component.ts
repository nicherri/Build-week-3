import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authSvc:AuthService,
    private router:Router
  ) {}

  newUser:Partial<iUser> = {}

  register() {
    this.authSvc.register(this.newUser).subscribe( () => {
      this.router.navigate(['/'])}
    )
  }

}
