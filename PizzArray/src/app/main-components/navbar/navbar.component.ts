import { Component, AfterViewInit, HostListener } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  show: boolean = false;
  showSearchForm: boolean = false;
  isMobile: boolean = window.innerWidth <= 500;

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
}
