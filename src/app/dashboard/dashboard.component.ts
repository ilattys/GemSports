import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.loggedIn.value) {
      this.router.navigateByUrl('signin').then();
    }
  }

  ngOnInit(): void {

  }

  logOut(): void {
    this.authService.logOut();
  }
}
