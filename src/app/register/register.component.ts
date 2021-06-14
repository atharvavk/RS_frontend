import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  confirm_password = '';
  email = '';
  name = '';
  _registrationResponse: any;

  get registrationResponse() {
    if (this.auth.registrationResponse.success) {
      this.router.navigate(['login']);
    }
    return this.auth.registrationResponse;
  }

  constructor(private auth: AuthenticationService, public router: Router) {
    this._registrationResponse = auth.registrationResponse;
  }

  formAction() {
    console.log('usename = ', this.username);
    console.log('password = ', this.password);
    let req = {
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.email,
    };
    this.auth.register(req);
  }

  ngOnInit(): void {}
}
