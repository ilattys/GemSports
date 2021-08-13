import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { HomeService } from '../_service/home.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  // initialCard: boolean;
  // createAccountCard: boolean;
  loginCard: boolean;

  username: any;
  password: any;
  // verifyPassword: any;

  subscriptions = [];
  loggedIn = false;


  constructor(private authService: AuthService, private homeService: HomeService,
              private router: Router) {
    this.subscriptions.push(this.authService.loggedIn.subscribe(data => {
      this.loggedIn = data;
      if (this.loggedIn === true) {
        this.router.navigateByUrl('dashboard').then();
      }
    }
    ));
  }

  ngOnInit(): void {
    // this.initialCard = true;
    // this.createAccountCard = false;
    this.loginCard = true;

    this.authService.loggedIn.next(false);
    this.authService.logOut();
  }

  logIn(): void {
    this.authService.logIn(this.username, this.password);
  }

  // showLoginCard(): void {
  //   this.initialCard = false;
  //   this.createAccountCard = false;
  //   this.loginCard = true;
  // }

  // showCreateCard(): void {
  //   this.initialCard = false;
  //   this.createAccountCard = true;
  //   this.loginCard = false;
  // }

  // createAccount(): void {
  //   if (this.password !== this.verifyPassword){
  //     this.homeService.log('error', 'Passwords Do Not Match');
  //     return;
  //   }
  //   this.authService.createAccount(this.username, this.password);
  // }

  // closeCards(): void {
    // this.initialCard = true;
    // this.createAccountCard = false;
    // this.loginCard = false;
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }
}
