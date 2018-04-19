import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class TodoService {

  constructor(private http: Http, private router: Router) { }

  savetoken() {
    return localStorage.getItem('token');
  }
  getId(t) {

    const token = localStorage.getItem('token');
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token).id;
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
  gettodos() {
    console.log( this.getId(this.savetoken()));
    return this.http.get('http://localhost:3000/api/todos/' + this.getId(this.savetoken()) );
  }
  logout() {
    localStorage.removeItem('token');
    return this.router.navigateByUrl('/login');
  }
  addTodo(todo) {
    return this.http.post('http://localhost:3000/api/todos/' + this.getId(this.savetoken()) , todo) ;  }
}



