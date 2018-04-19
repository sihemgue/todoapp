import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

@Injectable()
export class TodoGuard implements CanActivate {
  constructor(private router: Router , private todoservice: TodoService ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( !this.todoservice.checktoken()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
