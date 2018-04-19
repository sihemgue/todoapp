import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }
  getForm(f) {
    if (f.valid) {
      this.authservice.addUser(f.value).subscribe(res => {
        // console.log(res);
        const token = res.json().data.token ;
        this.authservice.savetoken(token);

        this.router.navigateByUrl('/login');
      });
    }
  }
  getErrorMessage(fcontrol) {
    return fcontrol.hasError('required') ? 'You must enter a value' : fcontrol.hasError('email') ? 'Not a valid email' :
      fcontrol.hasError('minlength') ? 'Password should contain 8 characters' : '';
  }
}
