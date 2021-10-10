import { Injectable } from '@angular/core';
import { UserCredential } from '../_model/UserCredential';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {HomeService} from './home.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(null);
  instance: string;

  public user: UserCredential;
  test: any;

  constructor(private http: HttpClient, private router: Router, private homeService: HomeService) {
    this.instance = localStorage.getItem('instance');
    if (this.instance === null || this.instance === undefined) {
      this.loggedIn.next(false);
    }
    else {
      this.loggedIn.next(true);
    }
  }

  // createAccount(username: any, password: any) {
  //
  // }

  logIn(username: string, password: string): void {
    this.user = new UserCredential();
    this.user.username = username;
    this.user.password = password;
    const url = this.buildUrl('AuthenticateUser');
    this.http.post<any>(url, this.user).subscribe(
      (response) => {
        if (response === null){
          console.log('Invalid Credentials');
          this.homeService.log('error', 'Invalid Credentials');
          this.loggedIn.next(false);
          return;
        }
        if (response.response === 'Account Verified'){
          console.log('Account Verified');
          this.homeService.log('success', 'Account Verified');
          this.loggedIn.next(true);
          const instance = this.createInstance();
          localStorage.setItem('instance', instance);
          this.router.navigateByUrl('dashboard').then();
        }
      },
      (error => {
        console.log(error);
      })
    );
  }

  private buildUrl(controller): any{
    return `https://localhost:44393/api/Authenticate/` + controller;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('signin').then();
  }

  private createInstance(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
