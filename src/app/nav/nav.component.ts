import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  isMenuOpen = false;
  isUserConnected = false;

  constructor(public userService: UserService, private router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserConnected() {
    this.isUserConnected = !this.isUserConnected;
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('user') != 'null');
    if (localStorage.getItem('user') != 'null') {
      this.isUserConnected = true;
    } else {
      this.isUserConnected = false;
    }
  }



  logout() {
    this.userService.Logout();
    localStorage.removeItem('user');
    this.isUserConnected = false;
    this.router.navigate(['login']);
  }

}
