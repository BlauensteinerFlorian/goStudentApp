import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { Offer } from './shared/offer';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'gostudentapp';

  constructor(private authService: AuthenticationService) { }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  isTutor() {
    return this.authService.isTutor();
  }

  getNavTabs() {
    if (this.isTutor() && this.isLoggedIn())
      return "six";
    else if (this.isLoggedIn())
      return "five";
    return "four";
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }

}
