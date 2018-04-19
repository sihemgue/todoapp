import { Injectable } from '@angular/core';
import {Http  } from '@angular/http';
import { JwtHelper} from 'angular2-jwt';
@Injectable()
export class AuthService {

  constructor( private http: Http) { }
  login(user) {
   return this.http.post('http://localhost:3000/auth/login', user);
  }

  savetoken(T) {
   return localStorage.setItem('token', T);
  }
  checktoken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const jwtHelper: JwtHelper = new JwtHelper();
      console.log(jwtHelper.decodeToken(token));
     return !jwtHelper.isTokenExpired(token) ;
    } else  {
       return false;
      }

  }
}
