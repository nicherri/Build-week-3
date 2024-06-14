import {
  Component,
  AfterViewInit,
  HostListener,
  inject,
  TemplateRef,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { iAuthData } from '../../Models/i-auth-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  show: boolean = false;
  showSearchForm: boolean = false;
  isMobile: boolean = window.innerWidth <= 500;
  cerco: string = '';
  isUserLogged: boolean = false;

  constructor(private authSvc: AuthService, private router: Router) {}

  //LOGIN
  authData: iAuthData = {
    email: 'mario@email.it',
    password: '12345678',
  };

  ngOnInit() {
    console.log(this.isUserLogged);
    this.authSvc.isLoggedIn$.subscribe((isUserLogged) => {
      this.isUserLogged = isUserLogged;
      console.log(this.isUserLogged);
    });
  }

  login(): void {
    this.authSvc.login(this.authData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  //MODALE
  closeResult = '';
  private modalSvc = inject(NgbModal);

  //MODALE
  open(content: TemplateRef<any>) {
    this.modalSvc
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  toggleShow() {
    this.show = !this.show;
  }

  toggleSearchForm(event: Event) {
    event.preventDefault(); // Prevenire il comportamento predefinito del link
    this.showSearchForm = !this.showSearchForm;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 500;
  }

  ngAfterViewInit(): void {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach((dropdownToggleEl) => {
      new bootstrap.Dropdown(dropdownToggleEl);
    });
  }

  checkUserLogged(): void {
    console.log(this.isUserLogged);
    this.authSvc.isLoggedIn$.subscribe((isUserLogged) => {
      this.isUserLogged = isUserLogged;
      console.log(this.isUserLogged);
    });
  }

  logout(): void {
    this.authSvc.logout();
    this.router.navigate(['/']);
  }
}
