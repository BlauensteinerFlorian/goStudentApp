import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'gs-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    this.userService.getSingle(userId.toString()).subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }
}
