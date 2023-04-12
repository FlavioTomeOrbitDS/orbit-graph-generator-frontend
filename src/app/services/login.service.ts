import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user = ['@orbitdatascience'];
  private passwrd = ['psswd@0123'];

  private userLogged = false;
  private setUserLogged(value: boolean) {
    this.userLogged = value;
  }

  public getUserLogged() {
    return this.userLogged;
  }

  constructor(private router: Router) {}

  public login(user: string, password: string) {
    if (this.user.indexOf(user) > -1 && this.passwrd.indexOf(password) > -1) {
      this.setUserLogged(true);
      return true;
    } else {
      this.setUserLogged(false);
      return false;
    }
  }

  public logout() {
    this.setUserLogged(false);
    this.router.navigateByUrl('/login');
  }
}
